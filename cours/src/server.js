require('dotenv').config();

const express = require('express');
const cors = require('cors');
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

app.use(cors());
app.use(express.json());

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
