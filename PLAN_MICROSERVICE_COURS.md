# Plan technique du microservice `cours`

## Objectif

Remplacer le backend `cours` actuel par un microservice avec une technologie differente de Spring Boot, par exemple :

- Node.js
- Express
- PostgreSQL

Le service devra fonctionner avec le reste de l'architecture :

- Eureka
- Config Server
- API Gateway
- Keycloak
- evaluation Spring Boot
- RabbitMQ

## 1. Fonction du service `cours`

Le microservice `cours` doit gerer les donnees metier suivantes :

- creation d'un cours
- modification d'un cours
- suppression d'un cours
- recuperation d'un cours par id
- liste de tous les cours
- verification de l'existence d'un cours pour la communication avec `evaluation`

## 2. Donnees metier

### Entite `Course`

Champs proposes :

- `id`
- `title`
- `description`
- `duration`
- `level`
- `teacherName`
- `createdAt`
- `updatedAt`

### Exemple JSON

```json
{
  "id": 1,
  "title": "Spring Basics",
  "description": "Introduction au framework Spring",
  "duration": 12,
  "level": "BEGINNER",
  "teacherName": "Amine Ben Ali"
}
```

## 3. Base de donnees

### Choix recommande

- PostgreSQL

### Pourquoi

- la demande du sujet accepte une technologie differente
- PostgreSQL est simple a dockeriser
- PostgreSQL est adapte a un microservice moderne

### Tables

- `courses`

## 4. API REST du service `cours`

### CRUD

- `POST /cours`
- `GET /cours`
- `GET /cours/{id}`
- `PUT /cours/{id}`
- `DELETE /cours/{id}`

### Validation utile

- `GET /cours/{id}` doit renvoyer `404` si le cours n'existe pas
- `POST /cours` doit valider les champs obligatoires
- `PUT /cours/{id}` doit refuser une mise a jour si l'id est absent

## 5. Communication avec `evaluation`

## 5.1 Communication synchrone

Scenarios proposes :

1. `evaluation` verifie qu'un cours existe avant d'assigner un quiz
2. `evaluation` recupere les details du cours pour les afficher dans une reponse

### Comportement attendu

- si le cours existe, `evaluation` enregistre l'association
- si le cours n'existe pas, `evaluation` retourne `404` ou `null` selon le design retenu

## 5.2 Communication asynchrone

Scenarios proposes :

1. creation d'un cours -> message RabbitMQ
2. suppression d'un cours -> message RabbitMQ

### Exemple de message

- `Course created with id: X`
- `Course deleted with id: X`

## 6. Securite

Le service `cours` sera protege via le gateway et Keycloak.

### Ce qu'il faut verifier

- acces aux routes via token JWT
- protection des routes sensibles
- roles si necessaire :
  - `ADMIN`
  - `TEACHER`
  - `STUDENT`

## 7. Enregistrement Eureka

Le service `cours` doit etre visible dans Eureka.

### Verification

- demarrage du service
- presence dans l'interface Eureka
- appel via `lb://cours` ou le nom retenu

## 8. Configuration

Le service devra avoir :

- son port
- son nom dans Eureka
- sa configuration base de donnees
- sa configuration RabbitMQ si besoin
- sa configuration vers Config Server

## 9. Dockerisation

Le service devra etre dockerise avec :

- `Dockerfile`
- variables d'environnement
- connexion PostgreSQL
- connexion Eureka

### Containerisation attendue

- un conteneur `cours`
- un conteneur `postgres`

## 10. Ordre de developpement

1. creer le projet Node.js
2. definir le modele `Course`
3. connecter PostgreSQL
4. creer les routes CRUD
5. brancher Eureka
6. brancher Gateway
7. brancher Keycloak
8. brancher communication avec `evaluation`
9. ajouter RabbitMQ
10. dockeriser

## 11. Tests a faire

### Tests unitaires

- validation des fonctions de service
- verification des cas d'erreur

### Tests API

- creation de cours
- lecture d'un cours
- suppression d'un cours
- verification de l'assignation depuis `evaluation`

### Tests integration

- passage par le gateway
- verification du token Keycloak
- verification de la presence dans Eureka

## 12. Definition du besoin pour le rendu

Pour la soutenance, il faut montrer :

- un frontend
- un backend distribue
- deux technologies cote microservices
- Eureka
- Gateway
- Config Server
- Keycloak
- RabbitMQ
- Docker

## 13. Etape suivante recommande

Apres ce plan, la prochaine etape est de definir :

- les routes exactes du service `cours`
- les champs de l'entite `Course`
- les messages RabbitMQ
- le format de retour attendu par `evaluation`

