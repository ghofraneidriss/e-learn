# Guide de Test - Bouton Profile

## ✅ Corrections appliquées

### 1. Route par défaut changée
- **AVANT**: Route par défaut → `/register`
- **APRÈS**: Route par défaut → `/login`

### 2. Hint box ajoutée sur la page login
La page de login affiche maintenant les identifiants admin par défaut:
```
Compte admin par défaut:
Email: admin@elearn.com
Password: admin123
```

### 3. Logs de débogage supprimés
Les console.log ont été retirés pour un code plus propre.

---

## 🧪 Comment tester le bouton Profile

### Étape 1: Démarrer l'application
```bash
cd frontend/e-learn
npm start
```

### Étape 2: Ouvrir le navigateur
Allez sur: `http://localhost:4200`

Vous devriez être redirigé automatiquement vers: `http://localhost:4200/login`

### Étape 3: Se connecter
Utilisez les identifiants affichés sur la page:
- **Email**: `admin@elearn.com`
- **Password**: `admin123`

Cliquez sur "Login"

### Étape 4: Vérifier la redirection
Après login, vous devriez être redirigé vers: `http://localhost:4200/dashboard`

### Étape 5: Tester le bouton Profile
1. Cliquez sur l'avatar en haut à droite (cercle avec la lettre "A")
2. Un dropdown s'ouvre avec 2 options:
   - **Profile** 👤
   - **Logout** 🚪
3. Cliquez sur "Profile"

### Résultat attendu:
✅ Vous devriez voir la page Profile avec:
- Avatar circulaire avec la lettre "A"
- Nom: "Admin User"
- Badge de rôle: "Administrateur"
- Détails:
  - Nom complet: Admin User
  - Email: admin@elearn.com
  - Rôle: Administrateur
- Bouton "Se déconnecter"

### URL attendue:
`http://localhost:4200/profile`

---

## ❌ Si le problème persiste

### Vérification 1: localStorage
Ouvrez la console du navigateur (F12) et tapez:
```javascript
localStorage.getItem('currentUser')
```

**Résultat attendu**:
```json
{"name":"Admin User","email":"admin@elearn.com","role":"ADMIN","isLoggedIn":true}
```

**Si c'est `null`**: Le login n'a pas fonctionné. Vérifiez les identifiants.

### Vérification 2: Routing
Dans la console, tapez:
```javascript
window.location.href
```

**Si vous êtes sur `/login` ou `/register`**: L'utilisateur n'est pas connecté.

### Vérification 3: AuthGuard
Le AuthGuard protège la route `/profile`. Si vous n'êtes pas connecté, il vous redirige vers `/login`.

Pour vérifier si vous êtes connecté, tapez dans la console:
```javascript
!!localStorage.getItem('currentUser')
```

**Résultat attendu**: `true`

---

## 🔄 Flux complet

```
1. Ouvrir http://localhost:4200
   ↓
2. Redirection automatique → /login
   ↓
3. Entrer: admin@elearn.com / admin123
   ↓
4. Cliquer "Login"
   ↓
5. AuthService.login() → Sauvegarde dans localStorage
   ↓
6. Redirection → /dashboard
   ↓
7. Cliquer sur avatar → Dropdown s'ouvre
   ↓
8. Cliquer "Profile"
   ↓
9. AuthGuard vérifie localStorage
   ↓
10. Si connecté → Affiche /profile
    Si non connecté → Redirige vers /login
```

---

## 📝 Fichiers modifiés

1. ✅ `app-routing-module.ts` - Route par défaut changée de `/register` à `/login`
2. ✅ `login.component.html` - Ajout hint box avec identifiants admin
3. ✅ `login.component.css` - Style pour hint box
4. ✅ `profile.component.ts` - Suppression logs de débogage
5. ✅ `auth.service.ts` - Suppression logs de débogage

## Diagnostics: 0 erreurs ✅

---

## 🚀 Test rapide

1. Ouvrez `http://localhost:4200`
2. Connectez-vous avec `admin@elearn.com` / `admin123`
3. Cliquez sur l'avatar en haut à droite
4. Cliquez sur "Profile"
5. ✅ Vous devriez voir votre profil!

Si ça ne fonctionne pas, vérifiez le localStorage dans la console (F12).
