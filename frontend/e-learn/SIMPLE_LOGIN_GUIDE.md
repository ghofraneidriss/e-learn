# 🚀 Simple Login - Quick Start Guide

## ✅ What Was Created

### New Files (5 files)
```
✅ src/app/services/auth.service.ts       - Hardcoded authentication
✅ src/app/guards/auth.guard.ts           - Route protection
✅ src/app/login/login.component.ts       - Login logic
✅ src/app/login/login.component.html     - Login form
✅ src/app/login/login.component.css      - Login styles
```

### Modified Files (3 files)
```
✅ src/app/app-module.ts                  - Removed Keycloak, added LoginComponent
✅ src/app/app-routing-module.ts          - Updated routes with simple AuthGuard
✅ src/app/app.html                       - Removed navbar
```

## 🎯 How It Works

### Hardcoded Credentials
- **Email**: `admin@elearn.com`
- **Password**: `admin123`
- **Role**: `ADMIN`

### Authentication Flow
1. User visits app → Redirects to `/login`
2. User enters credentials
3. If correct → Save to localStorage → Navigate to `/feedbacks`
4. If wrong → Show error: "Identifiants incorrects"

### Route Protection
- All routes except `/login` are protected by `AuthGuard`
- Guard checks `localStorage` for `{ isLoggedIn: true }`
- If not logged in → Redirect to `/login`

## 🚀 How to Run

### 1. Start Angular App
```bash
cd frontend/e-learn
npm start
```

### 2. Open Browser
```
http://localhost:4200
```

### 3. Login
- Email: `admin@elearn.com`
- Password: `admin123`
- Click "Login"

### 4. After Login
You should see:
- ✅ Redirected to `/feedbacks`
- ✅ Feedback Management dashboard
- ✅ All existing features working

## 📋 Testing Checklist

- [ ] Open `http://localhost:4200` → Should redirect to `/login`
- [ ] Try wrong credentials → Should show "Identifiants incorrects"
- [ ] Enter correct credentials → Should redirect to `/feedbacks`
- [ ] Dashboard loads with all features
- [ ] Navigate to `/reclamations` → Should work
- [ ] Refresh page → Should stay logged in
- [ ] Clear localStorage → Should redirect to login

## 🔐 Auth Service Methods

```typescript
authService.login(email, password)  // Returns true/false
authService.logout()                // Clears localStorage, navigates to /login
authService.getUser()               // Returns { name, role, isLoggedIn }
authService.getRole()               // Returns 'ADMIN'
authService.isAdmin()               // Returns true
authService.isLoggedIn()            // Returns true/false
```

## 📦 LocalStorage Structure

```json
{
  "elearn_user": {
    "name": "Admin",
    "role": "ADMIN",
    "isLoggedIn": true
  }
}
```

## 🎨 What You'll See

### Login Page
- Clean white card on gradient background
- Email and password inputs
- Login button
- Error message area (if wrong credentials)

### After Login
- Feedback Management dashboard (existing)
- All existing features work normally
- No navbar (removed for simplicity)

## 🐛 Troubleshooting

### Issue: Can't login
**Solution**: Make sure you use exact credentials:
- Email: `admin@elearn.com` (not admin@elearn.fr or anything else)
- Password: `admin123`

### Issue: Redirects to login after successful login
**Solution**: Check browser console for errors

### Issue: Dashboard not loading
**Solution**: Make sure backend services are running (if needed for data)

## 🔄 Logout

To logout, you can:
1. Clear localStorage manually in DevTools
2. Or add a logout button to your dashboard (call `authService.logout()`)

## ✨ Summary

- ✅ Simple hardcoded login (no backend needed)
- ✅ LocalStorage-based authentication
- ✅ Route protection with AuthGuard
- ✅ Existing dashboard components untouched
- ✅ No Keycloak complexity
- ✅ Ready to test immediately

---

**Credentials**: admin@elearn.com / admin123
**URL**: http://localhost:4200
**Command**: `npm start` (in frontend/e-learn directory)
