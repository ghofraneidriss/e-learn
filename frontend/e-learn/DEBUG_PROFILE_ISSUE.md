# 🔍 Debug - Problème Bouton Profile

## Symptôme
Quand vous cliquez sur "Profile", vous êtes redirigé vers `/login` au lieu de voir votre profil.

## Cause probable
L'utilisateur n'est PAS connecté. Le `localStorage` ne contient pas `currentUser`.

---

## ✅ Solution: Logs de débogage ajoutés

J'ai ajouté des logs détaillés dans la console pour identifier le problème exact.

### Fichiers modifiés:
1. ✅ `auth.service.ts` - Logs dans `login()`, `getUser()`, `isLoggedIn()`
2. ✅ `auth.guard.ts` - Logs dans `canActivate()`
3. ✅ `login.component.ts` - Logs dans `onSubmit()`

---

## 🧪 Comment déboguer

### Étape 1: Ouvrir la console
1. Appuyez sur **F12** dans votre navigateur
2. Allez dans l'onglet **Console**

### Étape 2: Aller sur la page login
Allez sur `http://localhost:4200/login`

### Étape 3: Se connecter
Entrez:
- **Email**: `admin@elearn.com`
- **Password**: `admin123`

Cliquez sur "Login"

### Étape 4: Regarder les logs dans la console

Vous devriez voir:

```
=== LOGIN FORM SUBMIT ===
Email input: admin@elearn.com
Password input: admin123

=== LOGIN ATTEMPT ===
Email: admin@elearn.com
Password: admin123
Registered users: []
Found user: undefined
Using hardcoded admin. Saving: {name: "Admin User", email: "admin@elearn.com", role: "ADMIN", isLoggedIn: true}
Saved! Verify: {"name":"Admin User","email":"admin@elearn.com","role":"ADMIN","isLoggedIn":true}

Login result: true
Login SUCCESS - navigating to /dashboard
```

### Étape 5: Cliquer sur Profile
1. Cliquez sur l'avatar en haut à droite
2. Cliquez sur "Profile"

Vous devriez voir dans la console:

```
=== AUTH GUARD ===
=== IS LOGGED IN ===
Has currentUser in localStorage: true
User is logged in: true
Access GRANTED

=== GET USER ===
localStorage currentUser: {"name":"Admin User","email":"admin@elearn.com","role":"ADMIN","isLoggedIn":true}
Parsed user: {name: "Admin User", email: "admin@elearn.com", role: "ADMIN", isLoggedIn: true}
```

---

## ❌ Si vous voyez "Access DENIED"

Si vous voyez dans la console:
```
=== AUTH GUARD ===
=== IS LOGGED IN ===
Has currentUser in localStorage: false
User is logged in: false
Access DENIED - redirecting to /login
```

**Cela signifie que vous n'êtes PAS connecté!**

### Solutions possibles:

#### Solution 1: Vérifier le localStorage manuellement
Dans la console, tapez:
```javascript
localStorage.getItem('currentUser')
```

**Si c'est `null`**: Vous n'êtes pas connecté. Reconnectez-vous.

#### Solution 2: Forcer la connexion manuellement
Dans la console, tapez:
```javascript
localStorage.setItem('currentUser', JSON.stringify({
  name: 'Admin User',
  email: 'admin@elearn.com',
  role: 'ADMIN',
  isLoggedIn: true
}))
```

Puis rechargez la page (F5) et cliquez sur Profile.

#### Solution 3: Vider le localStorage et recommencer
Dans la console, tapez:
```javascript
localStorage.clear()
```

Puis reconnectez-vous avec `admin@elearn.com` / `admin123`.

---

## 🔍 Vérifications supplémentaires

### Vérification 1: Le formulaire de login envoie-t-il les bonnes valeurs?
Regardez dans la console après avoir cliqué "Login":
```
=== LOGIN FORM SUBMIT ===
Email input: admin@elearn.com
Password input: admin123
```

**Si l'email ou le password est vide**: Le formulaire ne capture pas les valeurs. Problème avec `[(ngModel)]`.

### Vérification 2: Le login sauvegarde-t-il dans localStorage?
Regardez dans la console:
```
Saved! Verify: {"name":"Admin User",...}
```

**Si vous ne voyez pas ce log**: Le login n'a pas sauvegardé dans localStorage.

### Vérification 3: Le AuthGuard vérifie-t-il le bon localStorage?
Regardez dans la console quand vous cliquez sur Profile:
```
=== IS LOGGED IN ===
Has currentUser in localStorage: true
```

**Si c'est `false`**: Le localStorage a été vidé entre le login et le clic sur Profile.

---

## 📝 Checklist de débogage

- [ ] Console ouverte (F12)
- [ ] Connecté avec `admin@elearn.com` / `admin123`
- [ ] Logs de login visibles dans la console
- [ ] `localStorage.getItem('currentUser')` retourne un objet JSON
- [ ] Clic sur Profile
- [ ] Logs de AuthGuard visibles
- [ ] Si "Access DENIED", vérifier pourquoi `currentUser` est null

---

## 🚀 Test rapide

Ouvrez la console et tapez:

```javascript
// Test 1: Vérifier si connecté
console.log('Connecté?', !!localStorage.getItem('currentUser'));

// Test 2: Voir les données utilisateur
console.log('User:', JSON.parse(localStorage.getItem('currentUser') || 'null'));

// Test 3: Forcer la connexion
localStorage.setItem('currentUser', JSON.stringify({
  name: 'Admin User',
  email: 'admin@elearn.com',
  role: 'ADMIN',
  isLoggedIn: true
}));

// Test 4: Vérifier
console.log('Maintenant connecté?', !!localStorage.getItem('currentUser'));
```

Puis rechargez la page et cliquez sur Profile.

---

## 📧 Rapport de bug

Si le problème persiste, envoyez-moi:

1. **Capture d'écran de la console** après avoir cliqué "Login"
2. **Résultat de**: `localStorage.getItem('currentUser')`
3. **Capture d'écran de la console** après avoir cliqué "Profile"

Cela m'aidera à identifier le problème exact!
