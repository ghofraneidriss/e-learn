require('dotenv').config();

const express = require('express');
const cors = require('cors');
const promClient = require('prom-client');
const swaggerUi = require('swagger-ui-express');
const { initDb } = require('./db');
const { createPublisher } = require('./rabbitmq');
const { createEurekaClient } = require('./eureka');
const {
  listCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('./courseRepository');

const app = express();
const port = Number(process.env.PORT || 8080);
const register = new promClient.Registry();

register.setDefaultLabels({
  service: 'cours',
});

promClient.collectDefaultMetrics({ register });

const httpRequestsTotal = new promClient.Counter({
  name: 'cours_http_requests_total',
  help: 'Total number of HTTP requests handled by the cours service',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

const httpRequestDurationMs = new promClient.Histogram({
  name: 'cours_http_request_duration_ms',
  help: 'HTTP request duration in milliseconds for the cours service',
  labelNames: ['method', 'route', 'status'],
  buckets: [10, 25, 50, 100, 250, 500, 1000, 2500],
  registers: [register],
});

const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'E-Learn Cours API',
    version: '1.0.0',
    description: 'API du microservice Cours pour le projet E-Learn.',
  },
  servers: [
    { url: 'http://localhost:8080', description: 'Cours service direct' },
    { url: 'http://localhost:9000', description: 'Via API Gateway' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    '/cours': {
      get: {
        summary: 'Lister les cours',
        responses: {
          200: {
            description: 'Liste des cours',
          },
        },
      },
      post: {
        summary: 'Créer un cours',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title'],
                properties: {
                  title: { type: 'string', example: 'Architecture Microservices' },
                  description: { type: 'string', example: 'Cours de test' },
                  duration: { type: 'integer', example: 12 },
                  level: { type: 'string', example: 'BEGINNER' },
                  teacherName: { type: 'string', example: 'Aziz' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Cours créé',
          },
          400: {
            description: 'Données invalides',
          },
        },
      },
    },
    '/cours/{id}': {
      get: {
        summary: 'Récupérer un cours par id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: {
            description: 'Cours trouvé',
          },
          404: {
            description: 'Cours introuvable',
          },
        },
      },
      put: {
        summary: 'Mettre à jour un cours',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: {
            description: 'Cours mis à jour',
          },
          400: {
            description: 'Données invalides',
          },
          404: {
            description: 'Cours introuvable',
          },
        },
      },
      delete: {
        summary: 'Supprimer un cours',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          204: {
            description: 'Cours supprimé',
          },
          404: {
            description: 'Cours introuvable',
          },
        },
      },
    },
    '/cours/health': {
      get: {
        summary: 'Vérifier l’état du service',
        responses: {
          200: {
            description: 'Service en bonne santé',
          },
        },
      },
    },
  },
};

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const startedAt = process.hrtime.bigint();
  res.on('finish', () => {
    const route = req.route?.path || req.path || 'unknown';
    const status = String(res.statusCode);
    const method = req.method;
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;

    httpRequestsTotal.inc({ method, route, status });
    httpRequestDurationMs.observe({ method, route, status }, durationMs);
  });
  next();
});

app.use(
  '/cours/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

app.get('/cours/v3/api-docs', (_req, res) => {
  res.json(swaggerSpec);
});

async function safePublish(routingKey, payload) {
  try {
    await app.locals.publisher.publish(routingKey, payload);
  } catch (error) {
    console.warn('RabbitMQ publish skipped for cours service:', error.message);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForDatabase(maxAttempts = 30, delayMs = 2000) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await initDb();
      return;
    } catch (error) {
      lastError = error;
      console.warn(
        `PostgreSQL not ready for cours service (attempt ${attempt}/${maxAttempts}): ${error.message}`
      );
      if (attempt < maxAttempts) {
        await sleep(delayMs);
      }
    }
  }

  throw lastError;
}

async function registerWithEureka(maxAttempts = 30, delayMs = 2000) {
  const eureka = createEurekaClient(port);

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await new Promise((resolve, reject) => {
        eureka.start((error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      });

      console.log('cours service registered in Eureka');
      return;
    } catch (error) {
      console.warn(
        `Eureka registration failed for cours service (attempt ${attempt}/${maxAttempts}): ${error.message}`
      );
      if (attempt < maxAttempts) {
        await sleep(delayMs);
      }
    }
  }

  throw new Error('Unable to register cours service in Eureka after multiple attempts');
}

app.get('/health', (_req, res) => {
  res.json({ status: 'UP', service: 'cours' });
});

app.get('/cours/health', (_req, res) => {
  res.json({ status: 'UP', service: 'cours' });
});

app.get('/cours/metrics', async (_req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/cours', async (_req, res) => {
  const courses = await listCourses();
  res.json(courses);
});

app.get('/cours/:id', async (req, res) => {
  const course = await getCourseById(Number(req.params.id));
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  return res.json(course);
});

app.post('/cours', async (req, res) => {
  const { title, description, duration, level, teacherName } = req.body || {};

  if (!title) {
    return res.status(400).json({ message: 'title is required' });
  }

  const created = await createCourse({ title, description, duration, level, teacherName });
  await safePublish('course.created', {
    eventType: 'COURSE_CREATED',
    course: created,
  });

  return res.status(201).json(created);
});

app.put('/cours/:id', async (req, res) => {
  const id = Number(req.params.id);
  const existing = await getCourseById(id);
  if (!existing) {
    return res.status(404).json({ message: 'Course not found' });
  }

  const { title, description, duration, level, teacherName } = req.body || {};
  if (!title) {
    return res.status(400).json({ message: 'title is required' });
  }

  const updated = await updateCourse(id, { title, description, duration, level, teacherName });
  await safePublish('course.updated', {
    eventType: 'COURSE_UPDATED',
    course: updated,
  });

  return res.json(updated);
});

app.delete('/cours/:id', async (req, res) => {
  const id = Number(req.params.id);
  const existing = await getCourseById(id);
  if (!existing) {
    return res.status(404).json({ message: 'Course not found' });
  }

  await deleteCourse(id);
  await safePublish('course.deleted', {
    eventType: 'COURSE_DELETED',
    courseId: id,
  });

  return res.status(204).send();
});

async function start() {
  await waitForDatabase();
  app.locals.publisher = await createPublisher();

  app.listen(port, () => {
    console.log(`cours service listening on port ${port}`);
  });

  registerWithEureka().catch((error) => {
    console.error('Failed to register cours service in Eureka:', error.message);
  });
}

start().catch((error) => {
  console.error('Failed to start cours service:', error);
  process.exit(1);
});
