# User Service - Symfony Microservice with MongoDB & Keycloak

## 📋 Overview

This is a Symfony-based microservice for user management in the e-learning platform. It uses:
- **Symfony 7.2** for the REST API
- **MongoDB** with Doctrine ODM for data persistence
- **Keycloak** for authentication and authorization (JWT validation)

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Angular   │─────▶│  API Gateway │─────▶│ User Service│
│  Frontend   │      │  (Port 8085) │      │ (Port 8000) │
└─────────────┘      └──────────────┘      └─────────────┘
                              │                     │
                              │                     │
                              ▼                     ▼
                     ┌──────────────┐      ┌─────────────┐
                     │   Keycloak   │      │   MongoDB   │
                     │  (Port 8081) │      │ (Port 27017)│
                     └──────────────┘      └─────────────┘
```

## 🚀 Features

- ✅ JWT token validation using Keycloak public keys (JWKS)
- ✅ User CRUD operations
- ✅ Automatic user sync from Keycloak on first login
- ✅ Role-based access control (ROLE_ADMIN, ROLE_PROF, ROLE_ETUDIANT)
- ✅ MongoDB document storage
- ✅ CORS enabled for Angular frontend
- ✅ Health check endpoint

## 📦 Prerequisites

- PHP 8.2+
- Composer
- MongoDB 6.0+
- MongoDB PHP extension
- Keycloak 23+

## 🔧 Installation

### 1. Install Dependencies

```bash
cd backend/user-service-symfony
composer install
```

### 2. Configure Environment

Copy `.env.local.example` to `.env.local` and configure:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
APP_ENV=dev
APP_SECRET=your-secret-key-here
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB=elearning_users
KEYCLOAK_URL=http://localhost:8081
KEYCLOAK_REALM=elearning
KEYCLOAK_CLIENT_ID=elearning-client
KEYCLOAK_CLIENT_SECRET=your-client-secret
```

### 3. Start MongoDB

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or use your local MongoDB installation
```

### 4. Create MongoDB Indexes

```bash
php bin/console doctrine:mongodb:schema:create --index
```

## 🔐 Keycloak Configuration

### 1. Create Realm

1. Access Keycloak Admin Console: `http://localhost:8081`
2. Create a new realm named `elearning`

### 2. Create Client

1. Go to **Clients** → **Create Client**
2. Configure:
   - **Client ID**: `elearning-client`
   - **Client Protocol**: `openid-connect`
   - **Access Type**: `confidential`
   - **Valid Redirect URIs**: `http://localhost:4200/*`
   - **Web Origins**: `http://localhost:4200`

3. In **Credentials** tab, copy the **Client Secret**

### 3. Create Roles

Go to **Realm Roles** and create:
- `ADMIN`
- `PROF`
- `ETUDIANT`

### 4. Create Test Users

1. Go to **Users** → **Add User**
2. Create users with different roles:

**Admin User:**
- Username: `admin`
- Email: `admin@elearning.tn`
- Assign role: `ADMIN`

**Professor User:**
- Username: `prof1`
- Email: `prof1@elearning.tn`
- Assign role: `PROF`

**Student User:**
- Username: `student1`
- Email: `student1@elearning.tn`
- Assign role: `ETUDIANT`

## 🏃 Running the Service

### Development Server

```bash
# Using Symfony CLI (recommended)
symfony server:start --port=8000

# Or using PHP built-in server
php -S localhost:8000 -t public/
```

The service will be available at: `http://localhost:8000`

## 📡 API Endpoints

### Health Check (Public)

```http
GET /api/health
```

### User Endpoints (Authenticated)

All endpoints require `Authorization: Bearer <token>` header.

#### Get All Users
```http
GET /api/users
Roles: ROLE_USER
```

#### Get Current User (Auto-sync from Keycloak)
```http
GET /api/users/me
Roles: ROLE_USER
```

#### Get User by ID
```http
GET /api/users/{id}
Roles: ROLE_USER
```

#### Create User
```http
POST /api/users
Roles: ROLE_ADMIN
Content-Type: application/json

{
  "keycloakId": "uuid-from-keycloak",
  "email": "user@example.com",
  "name": "John Doe",
  "roles": ["ROLE_ETUDIANT"],
  "phone": "+216 12 345 678",
  "avatar": "https://example.com/avatar.jpg"
}
```

#### Update User
```http
PUT /api/users/{id}
Roles: ROLE_ADMIN
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+216 98 765 432",
  "active": true
}
```

#### Delete User
```http
DELETE /api/users/{id}
Roles: ROLE_ADMIN
```

#### Get Users by Role
```http
GET /api/users/role/{role}
Roles: ROLE_ADMIN

Example: GET /api/users/role/etudiant
```

#### Get Active Users
```http
GET /api/users/active
Roles: ROLE_USER
```

## 🧪 Testing with cURL

### 1. Get Keycloak Token

```bash
curl -X POST "http://localhost:8081/realms/elearning/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=elearning-client" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "username=student1" \
  -d "password=password" \
  -d "grant_type=password"
```

Response:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 300,
  "refresh_token": "...",
  "token_type": "Bearer"
}
```

### 2. Call API with Token

```bash
# Get current user (auto-sync)
curl -X GET "http://localhost:8000/api/users/me" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Get all users
curl -X GET "http://localhost:8000/api/users" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Create user (admin only)
curl -X POST "http://localhost:8000/api/users" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "keycloakId": "uuid-here",
    "email": "newuser@example.com",
    "name": "New User",
    "roles": ["ROLE_ETUDIANT"]
  }'
```

## 🔗 Integration with API Gateway

Add this route to `backend/config-server/src/main/resources/config/gateway.properties`:

```properties
spring.cloud.gateway.routes[4].id=USERS
spring.cloud.gateway.routes[4].uri=http://localhost:8000
spring.cloud.gateway.routes[4].predicates[0]=Path=/api/users,/api/users/**
```

Then access via gateway:
```bash
curl -X GET "http://localhost:8085/api/users/me" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📊 MongoDB Document Structure

```javascript
{
  "_id": ObjectId("..."),
  "keycloakId": "uuid-from-keycloak",
  "email": "user@example.com",
  "name": "John Doe",
  "roles": ["ROLE_USER", "ROLE_ETUDIANT"],
  "active": true,
  "phone": "+216 12 345 678",
  "avatar": "https://example.com/avatar.jpg",
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}
```

## 🔒 Security Flow

1. **User logs in** via Angular → Keycloak
2. **Keycloak returns** JWT access token
3. **Angular sends** request with `Authorization: Bearer <token>`
4. **Symfony validates** token using Keycloak public key (JWKS)
5. **Symfony extracts** user info (sub, email, roles) from token
6. **On first request**, user is auto-synced to MongoDB
7. **Symfony processes** request based on user roles

## 🛠️ Troubleshooting

### Token Validation Fails

- Verify Keycloak URL is accessible
- Check realm name matches configuration
- Ensure token is not expired

### MongoDB Connection Error

```bash
# Check MongoDB is running
docker ps | grep mongo

# Test connection
mongosh mongodb://localhost:27017
```

### CORS Issues

- Verify Angular URL in `nelmio_cors.yaml`
- Check browser console for CORS errors

## 📝 Development Notes

### Adding New Endpoints

1. Create method in `UserController`
2. Add `#[Route]` and `#[IsGranted]` attributes
3. Implement logic in `UserService`

### Custom Roles

Add roles in Keycloak and they will automatically be prefixed with `ROLE_` in Symfony.

## 🚀 Production Deployment

1. Set `APP_ENV=prod` in `.env.local`
2. Generate strong `APP_SECRET`
3. Use production MongoDB with authentication
4. Enable HTTPS for Keycloak
5. Configure proper CORS origins
6. Set up monitoring and logging

## 📚 Additional Resources

- [Symfony Documentation](https://symfony.com/doc/current/index.html)
- [Doctrine MongoDB ODM](https://www.doctrine-project.org/projects/mongodb-odm.html)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [JWT.io](https://jwt.io/) - Token debugger

## 👥 Support

For issues or questions, contact the development team.
