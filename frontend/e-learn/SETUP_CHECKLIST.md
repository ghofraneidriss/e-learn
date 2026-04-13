# ✅ Setup Checklist - Keycloak Integration

Follow this checklist step by step to get the Keycloak integration working.

## 📋 Pre-requisites

- [ ] Node.js and npm installed
- [ ] Java 17+ installed
- [ ] Maven installed
- [ ] PHP 8.2+ installed
- [ ] Symfony CLI installed
- [ ] MongoDB running
- [ ] Keycloak server running on port 8081

## 🔧 Step 1: Install Dependencies

```bash
cd frontend/e-learn
npm install keycloak-js --save
```

**Status**: ⬜ Not Done | ✅ Done

---

## 🔐 Step 2: Configure Keycloak

### 2.1 Access Keycloak Admin Console
- URL: `http://localhost:8081`
- Login with admin credentials

**Status**: ⬜ Not Done | ✅ Done

### 2.2 Create Realm
1. Click "Create Realm"
2. Name: `elearning`
3. Click "Create"

**Status**: ⬜ Not Done | ✅ Done

### 2.3 Create Client
1. Go to Clients → Create Client
2. Client ID: `elearning-client`
3. Client Protocol: `openid-connect`
4. Click "Next"
5. Client authentication: `OFF` (public client)
6. Authorization: `OFF`
7. Authentication flow: Check all boxes
8. Click "Save"

**Status**: ⬜ Not Done | ✅ Done

### 2.4 Configure Client Settings
1. Go to Clients → `elearning-client` → Settings
2. Valid Redirect URIs: `http://localhost:4200/*`
3. Valid Post Logout Redirect URIs: `http://localhost:4200/*`
4. Web Origins: `http://localhost:4200`
5. Click "Save"

**Status**: ⬜ Not Done | ✅ Done

### 2.5 Create Realm Roles
1. Go to Realm Roles → Create Role
2. Create these roles:
   - `ADMIN`
   - `PROF`
   - `ETUDIANT`

**Status**: ⬜ Not Done | ✅ Done

### 2.6 Create Test Users

#### Admin User
1. Go to Users → Add User
2. Username: `admin`
3. Email: `admin@elearning.com`
4. First Name: `Admin`
5. Last Name: `User`
6. Email Verified: `ON`
7. Click "Create"
8. Go to Credentials tab → Set Password
9. Password: `admin123` (temporary: OFF)
10. Go to Role Mapping → Assign Roles → Select `ADMIN`

**Status**: ⬜ Not Done | ✅ Done

#### Professor User
1. Go to Users → Add User
2. Username: `prof`
3. Email: `prof@elearning.com`
4. First Name: `Professor`
5. Last Name: `User`
6. Email Verified: `ON`
7. Click "Create"
8. Go to Credentials tab → Set Password
9. Password: `prof123` (temporary: OFF)
10. Go to Role Mapping → Assign Roles → Select `PROF`

**Status**: ⬜ Not Done | ✅ Done

#### Student User
1. Go to Users → Add User
2. Username: `student`
3. Email: `student@elearning.com`
4. First Name: `Student`
5. Last Name: `User`
6. Email Verified: `ON`
7. Click "Create"
8. Go to Credentials tab → Set Password
9. Password: `student123` (temporary: OFF)
10. Go to Role Mapping → Assign Roles → Select `ETUDIANT`

**Status**: ⬜ Not Done | ✅ Done

---

## 🚀 Step 3: Start Backend Services

### 3.1 Start Eureka Server
```bash
cd backend/eureka-server
mvn spring-boot:run
```
Wait for: "Started EurekaServerApplication"
URL: `http://localhost:8761`

**Status**: ⬜ Not Done | ✅ Done

### 3.2 Start Config Server
```bash
cd backend/config-server
mvn spring-boot:run
```
Wait for: "Started ConfigServerApplication"
URL: `http://localhost:8888`

**Status**: ⬜ Not Done | ✅ Done

### 3.3 Start API Gateway
```bash
cd backend/gateway
mvn spring-boot:run
```
Wait for: "Started GatewayApplication"
URL: `http://localhost:8085`

**Status**: ⬜ Not Done | ✅ Done

### 3.4 Start User Service (Symfony)
```bash
cd backend/user-service-symfony
symfony server:start
```
Wait for: "Listening on http://127.0.0.1:8000"
URL: `http://localhost:8000`

**Status**: ⬜ Not Done | ✅ Done

---

## 🎨 Step 4: Start Angular Application

```bash
cd frontend/e-learn
npm start
```
Wait for: "Compiled successfully"
URL: `http://localhost:4200`

**Status**: ⬜ Not Done | ✅ Done

---

## 🧪 Step 5: Test the Integration

### 5.1 Test Login Flow
1. Open browser: `http://localhost:4200`
2. Should redirect to Keycloak login
3. Enter username: `admin` / password: `admin123`
4. Should redirect back to `http://localhost:4200/feedbacks`
5. Navbar should show "Admin User" and "Administrateur" badge

**Status**: ⬜ Not Done | ✅ Done

### 5.2 Test Token Injection
1. Open DevTools → Network tab
2. Navigate to Feedbacks page
3. Check API request to `/feedbacks`
4. Verify header: `Authorization: Bearer <token>`

**Status**: ⬜ Not Done | ✅ Done

### 5.3 Test User Profile API
1. Open DevTools → Network tab
2. Look for request to `/api/users/me`
3. Should return user data with role

**Status**: ⬜ Not Done | ✅ Done

### 5.4 Test Logout
1. Click "Déconnexion" button in navbar
2. Should redirect to Keycloak logout
3. Then redirect to login page

**Status**: ⬜ Not Done | ✅ Done

### 5.5 Test Different Roles
1. Logout
2. Login as `prof` / `prof123`
3. Verify navbar shows "Professor User" and "Professeur"
4. Logout
5. Login as `student` / `student123`
6. Verify navbar shows "Student User" and "Étudiant"

**Status**: ⬜ Not Done | ✅ Done

---

## 🐛 Troubleshooting

### Issue: npm install fails
**Check**:
- [ ] Node.js is installed: `node --version`
- [ ] npm is installed: `npm --version`
- [ ] Run in Command Prompt (not PowerShell)

### Issue: Keycloak redirect fails
**Check**:
- [ ] Keycloak is running on port 8081
- [ ] Valid Redirect URIs includes `http://localhost:4200/*`
- [ ] Web Origins includes `http://localhost:4200`

### Issue: CORS errors
**Check**:
- [ ] Keycloak Web Origins configured
- [ ] API Gateway CORS enabled
- [ ] Browser cache cleared

### Issue: 401 Unauthorized
**Check**:
- [ ] User has correct role assigned in Keycloak
- [ ] Token is present in request headers
- [ ] Symfony user service is running
- [ ] Gateway routes are configured

### Issue: Token not refreshing
**Check**:
- [ ] AuthInterceptor is registered in app-module.ts
- [ ] Token expiry time in Keycloak (default: 5 minutes)

---

## 📊 Verification Checklist

After completing all steps, verify:

- [ ] Can login with admin user
- [ ] Can login with prof user
- [ ] Can login with student user
- [ ] Navbar shows correct user name
- [ ] Navbar shows correct role badge
- [ ] Can logout successfully
- [ ] Token is included in API requests
- [ ] Can access feedbacks page
- [ ] Can access reclamations page
- [ ] No console errors

---

## 🎉 Success Criteria

✅ All checkboxes above are checked
✅ No errors in browser console
✅ No errors in backend logs
✅ User can login, navigate, and logout
✅ API calls include Bearer token

---

## 📞 Need Help?

1. Check `KEYCLOAK_INTEGRATION_GUIDE.md` for detailed documentation
2. Check `QUICK_START.md` for quick reference
3. Check browser console for errors
4. Check backend logs for errors
5. Verify all services are running

---

## 📝 Notes

- Default token expiry: 5 minutes
- Token refresh: Automatic (30 seconds before expiry)
- Session timeout: Configurable in Keycloak
- Password policy: Configurable in Keycloak

---

**Last Updated**: April 12, 2026
**Version**: 1.0.0
