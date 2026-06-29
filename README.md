# E-Learn

Projet d'application web distribuee avec :

- frontend Angular
- microservice `evaluation` en Spring Boot
- microservice `cours` en Node.js + Express
- Eureka
- Config Server
- API Gateway
- Keycloak
- RabbitMQ
- PostgreSQL

## Demarrage rapide

La stack complete est decrite dans `docker-compose.yml`.

```bash
docker compose up -d
```

## Ports principaux

- Frontend: `4200`
- API Gateway: `9000`
- Evaluation: `8082`
- Cours: `8080`
- Eureka: `8761`
- Config Server: `8888`
- Keycloak: `8081`
- RabbitMQ Management: `15672`
- Prometheus: `9090`
- Grafana: `3000`

## Documentation et monitoring

- Swagger centralisé via le gateway: `http://localhost:9000/swagger-ui/index.html`
- Docs directes:
  - Cours: `http://localhost:8080/cours/api-docs`
  - Evaluation: `http://localhost:8082/swagger-ui/index.html`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3000` avec `admin / admin`

## Compte Keycloak

- realm: `elearn-realm`
- client: `elearn-client`
- users:
  - `testuser` / `password` -> role `STUDENT`
  - `teacheruser` / `password` -> role `TEACHER`
  - `adminuser` / `password` -> role `ADMIN`

## Guides utiles

- [Guide de test](./GUIDE_DE_TEST.md)
- [Planning projet](./PLANNING_PROJET.md)
- [Plan microservice cours](./PLAN_MICROSERVICE_COURS.md)
