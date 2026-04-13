# 🏗️ Architecture - Keycloak Integration

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Angular)                       │
│                     http://localhost:4200                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Login      │  │   Navbar     │  │ Feedbacks    │          │
│  │  Component   │  │  Component   │  │  Component   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                  │                  │                  │
│         └──────────────────┴──────────────────┘                  │
│                            │                                     │
│                   ┌────────▼────────┐                           │
│                   │  Auth Service   │                           │
│                   │  - login()      │                           │
│                   │  - logout()     │                           │
│                   │  - getToken()   │                           │
│                   │  - getRoles()   │                           │
│                   └────────┬────────┘                           │
│                            │                                     │
│              ┌─────────────┴─────────────┐                      │
│              │                           │                      │
│     ┌────────▼────────┐       ┌─────────▼─────────┐           │
│     │  Auth Guard     │       │  Auth Interceptor │           │
│     │  - canActivate()│       │  - intercept()    │           │
│     └─────────────────┘       └───────────────────┘           │
│                                                                  │
└──────────────────────────────┬───────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
         ┌──────────▼──────────┐ ┌─────────▼─────────┐
         │     KEYCLOAK        │ │   API GATEWAY     │
         │  (Authentication)   │ │   (Port 8085)     │
         │   Port 8081         │ │                   │
         │                     │ │  Routes:          │
         │  - Login/Logout     │ │  /feedbacks       │
         │  - Token Generation │ │  /reclamations    │
         │  - Role Management  │ │  /api/users       │
         └─────────────────────┘ └─────────┬─────────┘
                                            │
                              ┌─────────────┴─────────────┐
                              │                           │
                   ┌──────────▼──────────┐   ┌───────────▼──────────┐
                   │  User Service       │   │  Other Services      │
                   │  (Symfony)          │   │  (Spring Boot)       │
                   │  Port 8000          │   │                      │
                   │                     │   │  - Feedback Service  │
                   │  - Validate Token   │   │  - Reclamation Svc   │
                   │  - Manage Users     │   │  - Course Service    │
                   │  - MongoDB          │   │                      │
                   └─────────────────────┘   └──────────────────────┘
```

## 🔄 Authentication Flow

```
┌─────────┐                                                    ┌──────────┐
│ Browser │                                                    │ Keycloak │
└────┬────┘                                                    └────┬─────┘
     │                                                              │
     │ 1. Visit http://localhost:4200                              │
     ├──────────────────────────────────────────────────────────►  │
     │                                                              │
     │ 2. Angular initializes Keycloak (APP_INITIALIZER)           │
     │    - check-sso: Check for existing session                  │
     ├──────────────────────────────────────────────────────────►  │
     │                                                              │
     │ 3. No active session found                                  │
     │ ◄──────────────────────────────────────────────────────────┤
     │                                                              │
     │ 4. Redirect to /login                                       │
     │                                                              │
     │ 5. User clicks "Login" button                               │
     │                                                              │
     │ 6. Redirect to Keycloak login page                          │
     ├──────────────────────────────────────────────────────────►  │
     │                                                              │
     │ 7. User enters credentials                                  │
     ├──────────────────────────────────────────────────────────►  │
     │                                                              │
     │ 8. Keycloak validates credentials                           │
     │                                                              │
     │ 9. Redirect back with token (PKCE flow)                     │
     │ ◄──────────────────────────────────────────────────────────┤
     │                                                              │
     │ 10. Angular extracts token and stores in memory             │
     │                                                              │
     │ 11. AuthService calls GET /api/users/me                     │
     │     (with Bearer token)                                     │
     │                                                              │
     │ 12. User profile loaded                                     │
     │                                                              │
     │ 13. Redirect to /feedbacks                                  │
     │                                                              │
     │ 14. Dashboard displayed with navbar                         │
     │                                                              │
```

## 🔐 Token Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    HTTP REQUEST FLOW                          │
└──────────────────────────────────────────────────────────────┘

Component makes HTTP request
         │
         ▼
┌─────────────────────┐
│  Auth Interceptor   │
│  - Check if logged  │
│  - Get token        │
│  - Add to header    │
└──────────┬──────────┘
           │
           ▼
    Authorization: Bearer <token>
           │
           ▼
┌─────────────────────┐
│   API Gateway       │
│   Port 8085         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Backend Service    │
│  - Validate token   │
│  - Check roles      │
│  - Process request  │
└──────────┬──────────┘
           │
           ▼
    Response with data
           │
           ▼
┌─────────────────────┐
│  Auth Interceptor   │
│  - Check status     │
│  - Handle 401       │
│  - Refresh token    │
└──────────┬──────────┘
           │
           ▼
    Component receives data
```

## 🛡️ Route Protection Flow

```
User navigates to /feedbacks
         │
         ▼
┌─────────────────────┐
│    Auth Guard       │
│  canActivate()      │
└──────────┬──────────┘
           │
           ▼
    Is user logged in?
           │
     ┌─────┴─────┐
     │           │
    NO          YES
     │           │
     ▼           ▼
  Redirect   Check required roles
  to login   (from route data)
     │           │
     │      ┌────┴────┐
     │      │         │
     │   Has role   No role
     │      │         │
     │      ▼         ▼
     │   Allow    Redirect to
     │   access   /unauthorized
     │      │         │
     └──────┴─────────┘
            │
            ▼
    Component loads
```

## 📦 Module Structure

```
frontend/e-learn/src/app/
│
├── core/                          # Core functionality
│   ├── auth/
│   │   ├── auth.service.ts       # Authentication logic
│   │   └── auth.guard.ts         # Route protection
│   ├── interceptors/
│   │   └── auth.interceptor.ts   # Token injection
│   └── keycloak-init.factory.ts  # Keycloak initialization
│
├── components/                    # UI Components
│   ├── auth/
│   │   └── login/                # Login page
│   ├── navbar/                   # Navigation bar
│   ├── unauthorized/             # Access denied page
│   ├── feedback-management/      # Existing component
│   └── reclamation-management/   # Existing component
│
├── services/                      # API Services
│   ├── user.service.ts           # User API calls
│   ├── feedback.service.ts       # Feedback API calls
│   ├── reclamation.service.ts    # Reclamation API calls
│   └── api.config.ts             # API configuration
│
├── models/                        # Data Models
│   ├── user.model.ts             # User types
│   ├── feedback.model.ts         # Feedback types
│   └── reclamation.model.ts      # Reclamation types
│
├── app-module.ts                  # Main module
├── app-routing-module.ts          # Routing configuration
├── app.ts                         # Root component
└── app.html                       # Root template
```

## 🔑 Token Structure

```json
{
  "exp": 1712345678,
  "iat": 1712345378,
  "jti": "abc-123-def-456",
  "iss": "http://localhost:8081/realms/elearning",
  "sub": "user-uuid-here",
  "typ": "Bearer",
  "azp": "elearning-client",
  "session_state": "session-id",
  "realm_access": {
    "roles": [
      "ADMIN",
      "offline_access",
      "uma_authorization"
    ]
  },
  "scope": "openid profile email",
  "email_verified": true,
  "name": "Admin User",
  "preferred_username": "admin",
  "given_name": "Admin",
  "family_name": "User",
  "email": "admin@elearning.com"
}
```

## 🎯 Role-Based Access

```
┌─────────────────────────────────────────────────────────┐
│                    ROLE HIERARCHY                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │                    ADMIN                          │  │
│  │  - Full access to all features                    │  │
│  │  - User management                                │  │
│  │  - System configuration                           │  │
│  │  - View all data                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                         │                               │
│  ┌──────────────────────┴──────────────────────────┐  │
│  │                    PROF                          │  │
│  │  - Manage own courses                            │  │
│  │  - View student progress                         │  │
│  │  - Create/edit content                           │  │
│  │  - Grade assignments                             │  │
│  └──────────────────────────────────────────────────┘  │
│                         │                               │
│  ┌──────────────────────┴──────────────────────────┐  │
│  │                  ETUDIANT                        │  │
│  │  - View enrolled courses                         │  │
│  │  - Submit assignments                            │  │
│  │  - View own progress                             │  │
│  │  - Participate in forums                         │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🔄 Token Refresh Flow

```
┌────────────────────────────────────────────────────────┐
│              TOKEN LIFECYCLE                            │
└────────────────────────────────────────────────────────┘

Token issued (valid for 5 minutes)
         │
         ▼
    Time passes...
         │
         ▼
Token expires in 30 seconds
         │
         ▼
┌─────────────────────┐
│  Auth Interceptor   │
│  detects 401 error  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  AuthService        │
│  refreshToken()     │
└──────────┬──────────┘
           │
           ▼
    Call Keycloak refresh endpoint
           │
     ┌─────┴─────┐
     │           │
  Success     Failure
     │           │
     ▼           ▼
New token    Logout user
received     Redirect to login
     │
     ▼
Retry original request
with new token
     │
     ▼
Request succeeds
```

## 📊 Data Flow

```
┌──────────────────────────────────────────────────────────┐
│                  USER PROFILE SYNC                        │
└──────────────────────────────────────────────────────────┘

User logs in via Keycloak
         │
         ▼
Angular receives token
         │
         ▼
AuthService calls GET /api/users/me
         │
         ▼
API Gateway forwards to User Service
         │
         ▼
Symfony User Service:
  1. Validates Keycloak token
  2. Extracts user info (sub, email, name, roles)
  3. Checks if user exists in MongoDB
         │
     ┌───┴───┐
     │       │
  Exists   New User
     │       │
     ▼       ▼
  Return   Create in MongoDB
  user     then return user
     │       │
     └───┬───┘
         │
         ▼
User data returned to Angular
         │
         ▼
AuthService stores in BehaviorSubject
         │
         ▼
Components subscribe to user$
         │
         ▼
UI updates with user info
```

## 🎨 Component Communication

```
┌────────────────────────────────────────────────────────┐
│            COMPONENT INTERACTION                        │
└────────────────────────────────────────────────────────┘

┌─────────────────┐
│   App Component │
│   (Root)        │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐  ┌──────────────┐
│ Navbar │  │ Router Outlet│
└───┬────┘  └──────┬───────┘
    │              │
    │         ┌────┴────┐
    │         │         │
    │         ▼         ▼
    │    ┌─────────┐ ┌──────────┐
    │    │Feedbacks│ │Reclamat. │
    │    └─────────┘ └──────────┘
    │
    └──► AuthService.user$ (Observable)
         │
         └──► All components subscribe
              to get current user
```

## 🔧 Configuration Flow

```
┌────────────────────────────────────────────────────────┐
│           CONFIGURATION HIERARCHY                       │
└────────────────────────────────────────────────────────┘

environment.ts
    │
    ├─► apiGateway: 'http://localhost:8085'
    │
    └─► keycloak:
            ├─► url: 'http://localhost:8081'
            ├─► realm: 'elearning'
            └─► clientId: 'elearning-client'
                    │
                    ▼
            keycloak-init.factory.ts
                    │
                    ▼
            Keycloak instance created
                    │
                    ▼
            Used by AuthService
                    │
                    ▼
            Used by components
```

## 📈 Scalability Considerations

```
Current Architecture:
- Single Keycloak instance
- Single API Gateway
- Multiple microservices
- MongoDB for user data

Future Enhancements:
- Keycloak clustering for HA
- API Gateway load balancing
- Service mesh (Istio/Linkerd)
- Redis for session caching
- Distributed tracing
```

## 🎯 Summary

This architecture provides:
- ✅ Centralized authentication (Keycloak)
- ✅ Stateless token-based auth (JWT)
- ✅ Role-based access control
- ✅ Automatic token refresh
- ✅ Secure token storage (memory only)
- ✅ Microservices integration
- ✅ Scalable design
- ✅ Clean separation of concerns

---

**Architecture Version**: 1.0.0
**Last Updated**: April 12, 2026
