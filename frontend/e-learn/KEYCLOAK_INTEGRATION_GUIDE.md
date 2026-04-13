# Keycloak Integration Guide - Angular E-Learning Platform

## 📋 Overview

This guide explains the complete Keycloak authentication integration for the Angular e-learning platform.

## 🎯 What Was Implemented

### 1. **Environment Configuration**
- `src/environments/environment.ts` - Development config
- `src/environments/environment.prod.ts` - Production config
- Keycloak settings: URL, realm, clientId
- API Gateway URL configuration

### 2. **Core Authentication**
- `src/app/core/keycloak-init.factory.ts` - Keycloak initialization
- `src/app/core/auth/auth.service.ts` - Authentication service
- `src/app/core/auth/auth.guard.ts` - Route protection
- `src/app/core/interceptors/auth.interceptor.ts` - HTTP token injection

### 3. **Components**
- `src/app/components/auth/login/` - Login page
- `src/app/components/navbar/` - Navigation with user info
- `src/app/components/unauthorized/` - Access denied page

### 4. **Models & Services**
- `src/app/models/user.model.ts` - User data types
- `src/app/services/user.service.ts` - User API calls

### 5. **Module Updates**
- `app-module.ts` - Added Keycloak initialization & interceptor
- `app-routing-module.ts` - Added guards and role-based routes
- `app.html` - Added navbar component

## 🚀 Installation Steps

### Step 1: Install Dependencies

**IMPORTANT**: You need to run this command manually because PowerShell execution policy is blocking npm:

```bash
cd frontend/e-learn
npm install keycloak-js --save
```

### Step 2: Configure Keycloak Server

Make sure your Keycloak server is running on `http://localhost:8081` with:

**Realm**: `elearning`
**Client ID**: `elearning-client`
**Client Settings**:
- Access Type: `public`
- Valid Redirect URIs: `http://localhost:4200/*`
- Web Origins: `http://localhost:4200`

**Roles** (Realm Roles):
- `ADMIN`
- `PROF`
- `ETUDIANT`

### Step 3: Create Test Users in Keycloak

1. Go to Keycloak Admin Console: `http://localhost:8081`
2. Select realm `elearning`
3. Go to Users → Add User
4. Create users and assign roles:
   - Admin user → assign `ADMIN` role
   - Professor user → assign `PROF` role
   - Student user → assign `ETUDIANT` role

### Step 4: Start Backend Services

```bash
# Start Eureka Server (port 8761)
cd backend/eureka-server
mvn spring-boot:run

# Start Config Server (port 8888)
cd backend/config-server
mvn spring-boot:run

# Start API Gateway (port 8085)
cd backend/gateway
mvn spring-boot:run

# Start User Service Symfony (port 8000)
cd backend/user-service-symfony
symfony server:start
```

### Step 5: Start Angular Application

```bash
cd frontend/e-learn
npm start
```

The application will be available at: `http://localhost:4200`

## 🧪 Testing the Integration

### Test 1: Login Flow

1. Open browser: `http://localhost:4200`
2. You should be redirected to Keycloak login page
3. Enter credentials for a test user
4. After successful login, you should be redirected to `/feedbacks`
5. Navbar should display user name and role

### Test 2: Token Injection

1. Open browser DevTools → Network tab
2. Navigate to Feedbacks or Reclamations
3. Check API requests to `http://localhost:8085`
4. Verify `Authorization: Bearer <token>` header is present

### Test 3: Role-Based Access

1. Login as ETUDIANT user
2. Try to access all routes - should work
3. Logout and login as PROF
4. Verify access to appropriate routes

### Test 4: Token Refresh

1. Login and wait for token to expire (default: 5 minutes)
2. Make an API call
3. Token should refresh automatically
4. Check console for refresh logs

### Test 5: Logout

1. Click "Déconnexion" button in navbar
2. Should be redirected to Keycloak logout
3. Then redirected back to login page

## 🔧 Configuration Details

### Keycloak Initialization

The app initializes Keycloak **before** Angular bootstraps using `APP_INITIALIZER`:

```typescript
{
  provide: APP_INITIALIZER,
  useFactory: keycloakInitializer,
  multi: true
}
```

This ensures authentication is ready before any component loads.

### Token Management

- **Access Token**: Stored in Keycloak instance (memory only)
- **Token Refresh**: Automatic when token expires (30 seconds before expiry)
- **Token Injection**: Automatic via HTTP interceptor

### Route Protection

Routes are protected using `AuthGuard`:

```typescript
{
  path: 'feedbacks',
  component: FeedbackManagementComponent,
  canActivate: [AuthGuard],
  data: { roles: ['ADMIN', 'PROF', 'ETUDIANT'] }
}
```

### User Profile Sync

On first login, the Angular app calls:
```
GET /api/users/me
```

The Symfony user service:
1. Validates the Keycloak token
2. Extracts user info (sub, email, name, roles)
3. Creates user in MongoDB if not exists
4. Returns user data

## 📁 File Structure

```
frontend/e-learn/src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   └── login/
│   │   ├── navbar/
│   │   └── unauthorized/
│   ├── core/
│   │   ├── auth/
│   │   │   ├── auth.service.ts
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts
│   │   └── keycloak-init.factory.ts
│   ├── models/
│   │   └── user.model.ts
│   ├── services/
│   │   ├── user.service.ts
│   │   ├── api.config.ts
│   │   ├── feedback.service.ts
│   │   └── reclamation.service.ts
│   ├── app-module.ts
│   └── app-routing-module.ts
├── assets/
│   └── silent-check-sso.html
└── environments/
    ├── environment.ts
    └── environment.prod.ts
```

## 🎨 UI Features

### Navbar
- Shows user name and role badge
- Role-based menu items
- Logout button
- Responsive design

### Login Page
- Clean, modern design
- Loading state during authentication
- Redirects to Keycloak login

### Unauthorized Page
- Displayed when user lacks required role
- Back to dashboard button

## 🔐 Security Features

1. **Token Validation**: All API calls include Bearer token
2. **Token Refresh**: Automatic refresh before expiry
3. **Route Guards**: Prevent unauthorized access
4. **Role-Based Access**: Check user roles before rendering
5. **Secure Storage**: Tokens stored in memory (not localStorage)
6. **PKCE Flow**: Enhanced security for public clients

## 🐛 Troubleshooting

### Issue: "Keycloak has not been initialized"
**Solution**: Make sure `APP_INITIALIZER` is configured in `app-module.ts`

### Issue: CORS errors
**Solution**: 
- Check Keycloak client Web Origins: `http://localhost:4200`
- Check API Gateway CORS configuration

### Issue: Token not included in requests
**Solution**: Verify `AuthInterceptor` is registered in providers

### Issue: Infinite redirect loop
**Solution**: 
- Check Keycloak Valid Redirect URIs
- Verify `onLoad: 'check-sso'` in keycloak-init.factory.ts

### Issue: 401 Unauthorized
**Solution**:
- Verify Keycloak token is valid
- Check Symfony user service is running
- Verify Gateway routes are configured

## 📝 API Endpoints

### User Service (via Gateway)

```
GET    /api/users/me          - Get current user profile
GET    /api/users             - Get all users (ADMIN only)
GET    /api/users/{id}        - Get user by ID
POST   /api/users             - Create user (ADMIN only)
PUT    /api/users/{id}        - Update user (ADMIN only)
DELETE /api/users/{id}        - Delete user (ADMIN only)
```

### Feedback Service (via Gateway)

```
GET    /feedbacks             - Get all feedbacks
POST   /feedbacks             - Create feedback
PUT    /feedbacks/{id}        - Update feedback
DELETE /feedbacks/{id}        - Delete feedback
```

### Reclamation Service (via Gateway)

```
GET    /reclamations          - Get all reclamations
POST   /reclamations          - Create reclamation
PUT    /reclamations/{id}     - Update reclamation
DELETE /reclamations/{id}     - Delete reclamation
```

## 🎯 Next Steps

1. **Add User Management UI** (ADMIN only)
   - List all users
   - Edit user roles
   - Deactivate users

2. **Add Course Management** (PROF role)
   - Create courses
   - Manage enrollments

3. **Add Student Dashboard** (ETUDIANT role)
   - Browse courses
   - Track progress

4. **Add Profile Page**
   - Edit user profile
   - Change preferences

5. **Add Notifications**
   - Real-time notifications
   - Email notifications

## 📚 References

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [keycloak-js Library](https://www.npmjs.com/package/keycloak-js)
- [Angular Guards](https://angular.io/guide/router#preventing-unauthorized-access)
- [HTTP Interceptors](https://angular.io/guide/http#intercepting-requests-and-responses)

## ✅ Summary

The Keycloak integration is now complete with:
- ✅ Keycloak initialization before app bootstrap
- ✅ Login/Logout functionality
- ✅ Automatic token injection in HTTP requests
- ✅ Token refresh on expiry
- ✅ Route protection with guards
- ✅ Role-based access control
- ✅ User profile sync with backend
- ✅ Modern UI with navbar and user info
- ✅ Unauthorized access handling

**Remember to run**: `npm install keycloak-js --save` before starting the application!
