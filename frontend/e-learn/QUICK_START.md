# 🚀 Quick Start - Keycloak Integration

## ⚡ Installation (REQUIRED)

```bash
cd frontend/e-learn
npm install keycloak-js --save
```

## 🔧 Keycloak Configuration

### Create Realm: `elearning`

### Create Client: `elearning-client`
- Access Type: `public`
- Valid Redirect URIs: `http://localhost:4200/*`
- Web Origins: `http://localhost:4200`

### Create Roles (Realm Roles)
- `ADMIN`
- `PROF`
- `ETUDIANT`

### Create Test Users
1. Admin user → assign `ADMIN` role
2. Professor user → assign `PROF` role
3. Student user → assign `ETUDIANT` role

## 🏃 Start Services

```bash
# Terminal 1: Keycloak (should already be running on port 8081)

# Terminal 2: Eureka Server
cd backend/eureka-server
mvn spring-boot:run

# Terminal 3: Config Server
cd backend/config-server
mvn spring-boot:run

# Terminal 4: API Gateway
cd backend/gateway
mvn spring-boot:run

# Terminal 5: User Service (Symfony)
cd backend/user-service-symfony
symfony server:start

# Terminal 6: Angular App
cd frontend/e-learn
npm start
```

## 🧪 Test

1. Open: `http://localhost:4200`
2. Should redirect to Keycloak login
3. Login with test user
4. Should see dashboard with navbar showing user info

## 📋 What Changed

### New Files Created:
- ✅ `src/environments/environment.ts` - Config
- ✅ `src/app/core/keycloak-init.factory.ts` - Keycloak init
- ✅ `src/app/core/auth/auth.service.ts` - Auth logic
- ✅ `src/app/core/auth/auth.guard.ts` - Route protection
- ✅ `src/app/core/interceptors/auth.interceptor.ts` - Token injection
- ✅ `src/app/components/auth/login/` - Login page
- ✅ `src/app/components/navbar/` - Navigation bar
- ✅ `src/app/components/unauthorized/` - Access denied page
- ✅ `src/app/models/user.model.ts` - User types
- ✅ `src/app/services/user.service.ts` - User API

### Modified Files:
- ✅ `src/app/app-module.ts` - Added Keycloak init & interceptor
- ✅ `src/app/app-routing-module.ts` - Added guards & routes
- ✅ `src/app/app.html` - Added navbar
- ✅ `src/app/services/api.config.ts` - Use environment config

## 🎯 Key Features

- 🔐 Keycloak authentication
- 🔑 Automatic token injection
- 🔄 Token auto-refresh
- 🛡️ Route guards
- 👥 Role-based access
- 📊 User profile sync
- 🎨 Modern UI with navbar

## 📖 Full Documentation

See `KEYCLOAK_INTEGRATION_GUIDE.md` for complete details.
