# Keycloak Setup Guide for E-Learning Platform

## 🎯 Overview

This guide walks you through setting up Keycloak for the e-learning platform with proper realm, client, roles, and users configuration.

## 🚀 Quick Start with Docker

```bash
# Start Keycloak
docker run -d \
  --name elearning-keycloak \
  -p 8081:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:23.0 \
  start-dev
```

Access Keycloak Admin Console: `http://localhost:8081`

## 📋 Step-by-Step Configuration

### Step 1: Create Realm

1. Login to Keycloak Admin Console
   - URL: `http://localhost:8081`
   - Username: `admin`
   - Password: `admin`

2. Create new realm:
   - Click dropdown next to "master" realm
   - Click "Create Realm"
   - **Realm name**: `elearning`
   - Click "Create"

### Step 2: Configure Realm Settings

1. Go to **Realm Settings**
2. In **General** tab:
   - **Display name**: `E-Learning Platform`
   - **Enabled**: ON

3. In **Login** tab:
   - **User registration**: ON (optional)
   - **Forgot password**: ON (optional)
   - **Remember me**: ON

4. In **Tokens** tab:
   - **Access Token Lifespan**: 5 minutes (300 seconds)
   - **Refresh Token Lifespan**: 30 minutes (1800 seconds)

### Step 3: Create Client

1. Go to **Clients** → Click "Create client"

2. **General Settings**:
   - **Client type**: OpenID Connect
   - **Client ID**: `elearning-client`
   - Click "Next"

3. **Capability config**:
   - **Client authentication**: ON
   - **Authorization**: OFF
   - **Authentication flow**:
     - ✅ Standard flow
     - ✅ Direct access grants
     - ✅ Service accounts roles
   - Click "Next"

4. **Login settings**:
   - **Root URL**: `http://localhost:4200`
   - **Home URL**: `http://localhost:4200`
   - **Valid redirect URIs**: 
     - `http://localhost:4200/*`
     - `http://localhost:8085/*`
   - **Valid post logout redirect URIs**: `http://localhost:4200/*`
   - **Web origins**: 
     - `http://localhost:4200`
     - `http://localhost:8085`
   - Click "Save"

5. Go to **Credentials** tab:
   - Copy the **Client Secret** (you'll need this for configuration)

### Step 4: Create Realm Roles

1. Go to **Realm roles** → Click "Create role"

2. Create the following roles:

**Role 1: ADMIN**
- **Role name**: `ADMIN`
- **Description**: `Administrator with full access`
- Click "Save"

**Role 2: PROF**
- **Role name**: `PROF`
- **Description**: `Professor/Instructor role`
- Click "Save"

**Role 3: ETUDIANT**
- **Role name**: `ETUDIANT`
- **Description**: `Student role`
- Click "Save"

### Step 5: Create Users

#### Admin User

1. Go to **Users** → Click "Create new user"
2. Fill in:
   - **Username**: `admin`
   - **Email**: `admin@elearning.tn`
   - **Email verified**: ON
   - **First name**: `Admin`
   - **Last name**: `User`
3. Click "Create"
4. Go to **Credentials** tab:
   - Click "Set password"
   - **Password**: `admin123`
   - **Temporary**: OFF
   - Click "Save"
5. Go to **Role mapping** tab:
   - Click "Assign role"
   - Select `ADMIN`
   - Click "Assign"

#### Professor User

1. Create new user:
   - **Username**: `prof1`
   - **Email**: `prof1@elearning.tn`
   - **Email verified**: ON
   - **First name**: `Mohamed`
   - **Last name**: `Ben Ali`
2. Set password: `prof123`
3. Assign role: `PROF`

#### Student User 1

1. Create new user:
   - **Username**: `student1`
   - **Email**: `student1@elearning.tn`
   - **Email verified**: ON
   - **First name**: `Ahmed`
   - **Last name**: `Trabelsi`
2. Set password: `student123`
3. Assign role: `ETUDIANT`

#### Student User 2

1. Create new user:
   - **Username**: `student2`
   - **Email**: `student2@elearning.tn`
   - **Email verified**: ON
   - **First name**: `Fatma`
   - **Last name**: `Gharbi`
2. Set password: `student123`
3. Assign role: `ETUDIANT`

### Step 6: Configure Client Scopes (Optional)

1. Go to **Client scopes** → Click "Create client scope"
2. **Name**: `user-profile`
3. **Type**: Default
4. Click "Save"
5. Go to **Mappers** tab → Click "Add mapper" → "By configuration"
6. Select "User Attribute"
   - **Name**: `phone`
   - **User Attribute**: `phone`
   - **Token Claim Name**: `phone`
   - **Claim JSON Type**: String
   - Click "Save"

### Step 7: Test Configuration

#### Get Access Token

```bash
curl -X POST "http://localhost:8081/realms/elearning/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=elearning-client" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "username=student1" \
  -d "password=student123" \
  -d "grant_type=password"
```

Expected response:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "not-before-policy": 0,
  "session_state": "...",
  "scope": "profile email"
}
```

#### Decode Token

Go to [jwt.io](https://jwt.io) and paste the access token to see:

```json
{
  "exp": 1234567890,
  "iat": 1234567590,
  "jti": "...",
  "iss": "http://localhost:8081/realms/elearning",
  "sub": "uuid-of-user",
  "typ": "Bearer",
  "azp": "elearning-client",
  "session_state": "...",
  "acr": "1",
  "realm_access": {
    "roles": [
      "ETUDIANT"
    ]
  },
  "scope": "profile email",
  "email_verified": true,
  "name": "Ahmed Trabelsi",
  "preferred_username": "student1",
  "given_name": "Ahmed",
  "family_name": "Trabelsi",
  "email": "student1@elearning.tn"
}
```

## 🔧 Configuration for Symfony Service

Update `backend/user-service-symfony/.env.local`:

```env
KEYCLOAK_URL=http://localhost:8081
KEYCLOAK_REALM=elearning
KEYCLOAK_CLIENT_ID=elearning-client
KEYCLOAK_CLIENT_SECRET=<paste-your-client-secret-here>
```

## 🧪 Testing Authentication Flow

### 1. Get Token for Admin

```bash
curl -X POST "http://localhost:8081/realms/elearning/protocol/openid-connect/token" \
  -d "client_id=elearning-client" \
  -d "client_secret=YOUR_SECRET" \
  -d "username=admin" \
  -d "password=admin123" \
  -d "grant_type=password" | jq -r '.access_token'
```

### 2. Call User Service

```bash
TOKEN="<paste-token-here>"

# Get current user (auto-sync)
curl -X GET "http://localhost:8000/api/users/me" \
  -H "Authorization: Bearer $TOKEN"

# Get all users (admin only)
curl -X GET "http://localhost:8000/api/users" \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Test Role-Based Access

```bash
# Student token - should work
curl -X GET "http://localhost:8000/api/users/me" \
  -H "Authorization: Bearer $STUDENT_TOKEN"

# Student token - should fail (403 Forbidden)
curl -X POST "http://localhost:8000/api/users" \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"keycloakId":"test","email":"test@test.com","name":"Test"}'
```

## 📊 User Summary

| Username  | Password    | Role      | Email                  |
|-----------|-------------|-----------|------------------------|
| admin     | admin123    | ADMIN     | admin@elearning.tn     |
| prof1     | prof123     | PROF      | prof1@elearning.tn     |
| student1  | student123  | ETUDIANT  | student1@elearning.tn  |
| student2  | student123  | ETUDIANT  | student2@elearning.tn  |

## 🔐 Security Best Practices

1. **Change default passwords** in production
2. **Use HTTPS** for Keycloak in production
3. **Enable email verification** for user registration
4. **Configure password policies**:
   - Go to **Authentication** → **Policies** → **Password Policy**
   - Add: Minimum length, uppercase, lowercase, digits, special chars
5. **Enable brute force detection**:
   - Go to **Realm Settings** → **Security Defenses**
   - Enable "Brute Force Detection"

## 🚀 Production Deployment

For production, use PostgreSQL instead of dev-mem:

```yaml
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: password

  keycloak:
    image: quay.io/keycloak/keycloak:23.0
    command: start
    environment:
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: password
      KC_HOSTNAME: keycloak.yourdomain.com
      KC_HTTPS_CERTIFICATE_FILE: /opt/keycloak/conf/cert.pem
      KC_HTTPS_CERTIFICATE_KEY_FILE: /opt/keycloak/conf/key.pem
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: <strong-password>
```

## 📚 Additional Resources

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Keycloak Admin REST API](https://www.keycloak.org/docs-api/latest/rest-api/)
- [OpenID Connect Specification](https://openid.net/specs/openid-connect-core-1_0.html)

## ❓ Troubleshooting

### Issue: Cannot access Keycloak

**Solution**: Check if container is running:
```bash
docker ps | grep keycloak
docker logs elearning-keycloak
```

### Issue: Invalid redirect URI

**Solution**: Add your frontend URL to "Valid redirect URIs" in client settings

### Issue: Token validation fails

**Solution**: 
- Verify realm name matches
- Check Keycloak URL is accessible from Symfony service
- Ensure token is not expired

### Issue: Roles not appearing in token

**Solution**: 
- Check user has roles assigned
- Verify roles are realm roles, not client roles
- Check client scope includes roles

## ✅ Verification Checklist

- [ ] Keycloak is running on port 8081
- [ ] Realm "elearning" is created
- [ ] Client "elearning-client" is configured
- [ ] Client secret is copied
- [ ] Roles ADMIN, PROF, ETUDIANT are created
- [ ] Test users are created with passwords
- [ ] Users have roles assigned
- [ ] Token can be obtained via curl
- [ ] Token contains expected roles
- [ ] Symfony service can validate token

---

**Setup Complete!** 🎉 Your Keycloak is now ready for the e-learning platform.
