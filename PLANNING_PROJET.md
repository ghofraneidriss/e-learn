# Planning projet E-Learn

## Objectif

Realiser une application web distribuee avec :

- un frontend
- un microservice `evaluation` en Spring Boot
- un microservice `cours` avec une technologie differente de Spring Boot
- Eureka pour la decouverte
- Config Server
- API Gateway
- Keycloak pour la securite
- RabbitMQ pour la communication asynchrone
- Dockerisation complete

## Hypothese d'architecture

Pour rester simple et conforme au sujet :

- `evaluation` reste en Spring Boot
- `cours` sera refait en Node.js + Express
- la base du service `cours` sera PostgreSQL
- le service `evaluation` peut rester avec H2 pour le developpement, ou passer a MySQL si vous voulez une version plus solide

## Etat actuel du projet

### Deja en place

- frontend Angular
- `eureka-server`
- `config-server`
- `api-gateway`
- `evaluation` en Spring Boot
- `backend` Spring Boot actuel
- `docker-compose-keycloak.yml`
- communication synchrone avec Feign cote Spring
- communication asynchrone avec RabbitMQ cote Spring

### A corriger ou remplacer

- le service `backend` actuel doit etre remplace par le vrai microservice `cours` en autre technologie
- la communication synchrone devra etre adaptee entre `evaluation` et `cours`
- la dockerisation globale manque encore
- le frontend doit etre relie aux APIs metier

## Planning par phases

### Phase 1 - Validation de l'existant

Objectif :

- verifier tout ce qui marche deja
- documenter les endpoints existants
- garder uniquement les morceaux utiles

Taches :

- tester `evaluation` directement
- tester `evaluation` via le gateway
- tester RabbitMQ
- tester Eureka
- tester Keycloak
- verifier le frontend actuel

Livrable :

- guide de test
- recap de l'architecture actuelle

### Phase 2 - Refonte du microservice `cours`

Objectif :

- remplacer le `backend` Spring Boot par un vrai microservice `cours` en autre techno

Taches :

- creer le projet Node.js + Express
- connecter PostgreSQL
- creer les routes REST de base
- exposer les operations metier de `cours`
- prevoir l'enregistrement dans Eureka ou une strategie de routage compatible

Livrable :

- microservice `cours` fonctionnel
- base de donnees associee
- endpoints testes

### Phase 3 - Communication entre microservices

Objectif :

- montrer une communication synchrone et une asynchrone

Scenarios synchrones :

1. `evaluation` verifie qu'un cours existe avant d'assigner un quiz
2. `evaluation` recupere les details d'un cours via l'API de `cours`

Scenarios asynchrones :

1. creation d'un quiz -> message RabbitMQ
2. assignation ou suppression -> event RabbitMQ si besoin

Livrable :

- au moins 2 scenarios documentes pour le synchrone
- au moins 2 scenarios documentes pour l'asynchrone

### Phase 4 - Securite Keycloak

Objectif :

- proteger l'application avec Keycloak via le gateway

Taches :

- configurer realm, client et roles
- proteger les routes gateway
- verifier les acces par role si demande
- tester le flux token -> gateway -> microservice

Livrable :

- acces securise au gateway
- scenarios de test avec token

### Phase 5 - Frontend

Objectif :

- transformer le template Angular en vrai front metier

Taches :

- garder le squelette visuel si utile
- creer les ecrans metier
- consommer le gateway
- gerer login/token
- afficher les cours et quiz

Livrable :

- front operationnel
- pages reliees aux APIs

### Phase 6 - Dockerisation

Objectif :

- pouvoir presenter une version dockerisee complete

Taches :

- creer un `Dockerfile` pour chaque service
- creer un `docker-compose.yml` global
- lancer Keycloak, RabbitMQ, Eureka, Config Server, gateway, frontend, `evaluation`, `cours`
- verifier le demarrage complet sur une machine propre

Livrable :

- stack dockerisee complete
- commande unique de lancement

### Phase 7 - Documentation et rendu

Objectif :

- preparer la presentation et la soutenance

Taches :

- mettre a jour le README
- garder une collection Postman propre
- documenter l'architecture
- documenter les tests
- documenter les scenarios de communication

Livrable :

- dossier de projet presentable
- guide d'installation
- guide de test
- schema d'architecture

## Ordre recommande

1. figer l'architecture cible
2. creer le microservice `cours` en Node.js
3. brancher la communication avec `evaluation`
4. securiser avec Keycloak
5. relier le frontend au gateway
6. dockeriser
7. documenter et tester de bout en bout

## Priorites pour avoir une bonne note

- respecter la contrainte "2 technologies differentes"
- montrer les communications synchrone et asynchrone
- prouver la securite via Keycloak
- livrer une version dockerisee
- garder une bonne documentation

## Prochaine etape proposee

Le meilleur prochain pas est de definir ensemble le microservice `cours` :

- ses entites
- ses routes
- sa base de donnees
- ses echanges avec `evaluation`

