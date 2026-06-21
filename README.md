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
