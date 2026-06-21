# Guide de test du projet E-Learn

Ce guide decrit une procedure simple pour tester le projet etape par etape, sans modifier le code.

## 1. Pre-requis

- Java installe sur la machine
- Maven ou les wrappers Maven du projet
- Docker Desktop lance
- Postman installe
- Le depot clone localement

## 2. Services a demarrer

L'ordre de demarrage conseille est le suivant :

1. Keycloak
2. RabbitMQ
3. Eureka Server
4. Config Server
5. Microservice `cours`
6. Microservice `evaluation`
7. API Gateway
8. Frontend

## 3. Ports attendus

- Keycloak: `8081`
- RabbitMQ Management: `15672`
- RabbitMQ AMQP: `5672`
- Eureka Server: `8761`
- Config Server: `8888`
- Cours Node.js: `8080`
- Evaluation: `8082`
- API Gateway: `9000`
- Frontend: `4200`

## 4. Verification rapide des services

Avant de tester les endpoints metier, verifie que chaque service repond.

### Keycloak

- Ouvre `http://localhost:8081`
- Verifie que l'interface s'affiche

### RabbitMQ

- Ouvre `http://localhost:15672`
- Verifie que le conteneur est en etat `Running`

### Eureka

- Ouvre `http://localhost:8761`
- Verifie que les services sont enregistres

### Gateway

- Verifie que `http://localhost:9000` repond au moins avec une erreur d'authentification si tu n'as pas encore de token

## 5. Obtenir le token Keycloak

Dans Postman, envoie une requete `POST` vers :

```text
http://localhost:8081/realms/elearn-realm/protocol/openid-connect/token
```

Body en `x-www-form-urlencoded` :

- `client_id`
- `username`
- `password`
- `grant_type=password`

Si la reponse contient `access_token`, copie ce token pour les requetes protegees.

Comptes disponibles :

- `testuser` / `password` -> role `STUDENT`
- `teacheruser` / `password` -> role `TEACHER`
- `adminuser` / `password` -> role `ADMIN`

## 6. Tester le microservice `evaluation` directement

Cette etape permet de valider le CRUD sans dependre du gateway.

### 6.1 Creer un quiz

`POST http://localhost:8082/quizzes`

Body JSON :

```json
{
  "title": "Quiz test",
  "description": "desc",
  "questions": ["q1", "q2"]
}
```

Resultat attendu :

- `201 Created`
- un objet `Quiz` avec un `id`

### 6.2 Lister les quizzes

`GET http://localhost:8082/quizzes`

Resultat attendu :

- `200 OK`
- une liste contenant le quiz cree

### 6.3 Consulter un quiz par id

`GET http://localhost:8082/quizzes/1`

Resultat attendu :

- `200 OK` si le quiz existe
- `404 Not Found` sinon

### 6.4 Supprimer un quiz

`DELETE http://localhost:8082/quizzes/1`

Resultat attendu :

- `204 No Content`

## 7. Tester RabbitMQ

Le `POST /quizzes` envoie aussi un message RabbitMQ.

### Controle attendu

Apres un `POST /quizzes` reussi :

- la queue `quiz.queue` doit recevoir un message
- le message attendu ressemble a :

```text
New quiz created with id: X
```

### Ou verifier

- interface RabbitMQ: `http://localhost:15672`
- queue: `quiz.queue`

## 8. Tester OpenFeign

L'assignation d'un quiz a un cours passe par le client Feign.

### 8.1 Verifier le service cours

`GET http://localhost:8080/cours/1`

Resultat attendu :

- `200 OK`
- un JSON avec `id` et `name`

### 8.2 Assigner le quiz au cours

`PUT http://localhost:8082/quizzes/1/assign/1`

Resultat attendu :

- `200 OK`
- le quiz renvoye avec `courseId = 1`

Si la reponse est `404`, verifier :

- que le quiz existe bien
- que le service `cours` est bien lance
- que le service `COURS` est visible dans Eureka

## 9. Tester via l'API Gateway

Une fois le token Keycloak recupere, tu peux refaire les memes tests via le gateway.

### 9.1 Creer un quiz

`POST http://localhost:9000/quizzes`

Header :

- `Authorization: Bearer <ACCESS_TOKEN>`
- `Content-Type: application/json`

### 9.2 Lister les quizzes

`GET http://localhost:9000/quizzes`

Header :

- `Authorization: Bearer <ACCESS_TOKEN>`

### 9.3 Assigner un quiz a un cours

`PUT http://localhost:9000/quizzes/1/assign/1`

Header :

- `Authorization: Bearer <ACCESS_TOKEN>`

### 9.4 Supprimer un quiz

`DELETE http://localhost:9000/quizzes/1`

Header :

- `Authorization: Bearer <ACCESS_TOKEN>`

## 10. Lancer toute la stack avec Docker

Si tu veux tester la version dockerisee complete, lance :

```bash
docker compose up -d
```

Ensuite, verifie :

- Keycloak: `http://localhost:8081`
- Eureka: `http://localhost:8761`
- RabbitMQ: `http://localhost:15672`
- Gateway: `http://localhost:9000`
- Frontend: `http://localhost:4200`

Le realm Keycloak `elearn-realm`, le client `elearn-client` et l'utilisateur `testuser` sont importes automatiquement.

## 11. Tester le frontend

Le frontend Angular se trouve dans `frontend/e-learn`.

### 10.1 Installer les dependances

Dans le dossier `frontend/e-learn`, lance :

```bash
npm install
```

### 10.2 Demarrer le frontend

```bash
npm start
```

Resultat attendu :

- l'application demarre sans erreur
- le front est accessible sur `http://localhost:4200`

### 10.3 Verifier l'affichage

Comme le front actuel est surtout un template, le premier test consiste a verifier :

- la page se charge
- les styles et images sont visibles
- aucune erreur critique n'apparait dans la console du navigateur

### 10.4 Verifier la partie back depuis le frontend

Pour l'instant, le projet frontend ne contient pas encore de services HTTP relies aux API Spring. Donc :

- tu peux tester le frontend comme une application graphique
- tu peux tester le backend via Postman ou le gateway
- le vrai test front-vers-back necessitera ensuite l'ajout d'appels HTTP dans Angular

## 12. Ordre de test recommande dans Postman

1. Obtenir le token Keycloak
2. Creer un quiz via le gateway
3. Lister les quizzes
4. Verifier la queue RabbitMQ
5. Assigner un quiz a un cours
6. Verifier le `courseId`
7. Supprimer le quiz

## 13. Resultats attendus

- `POST /quizzes` retourne `201`
- `GET /quizzes` retourne `200`
- `PUT /quizzes/{quizId}/assign/{courseId}` retourne `200`
- `DELETE /quizzes/{id}` retourne `204`
- RabbitMQ recoit un message a chaque creation de quiz

## 14. Depannage rapide

### `401 Unauthorized`

- token Keycloak absent ou invalide
- header `Authorization` manquant

### `503 Service Unavailable`

- gateway ne trouve pas le service dans Eureka
- service cible arrete

### `500 Internal Server Error` sur `POST /quizzes`

- verifier que `evaluation` est bien demarre
- verifier que RabbitMQ est lance
- verifier les logs du microservice

### `404 Not Found` sur l'assignation

- quiz absent
- backend `Cours` non joignable
- service `Cours` non enregistre dans Eureka

## 15. Fichiers utiles

- Collection Postman: [e-learn-postman-collection.json](./e-learn-postman-collection.json)
- Guide de test: [GUIDE_DE_TEST.md](./GUIDE_DE_TEST.md)
