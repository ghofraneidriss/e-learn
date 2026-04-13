import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  name: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Nettoyage du cache localStorage avant nouvelle connexion
    localStorage.removeItem('currentUser');
    this.cachedUser = null;
    this.cacheTimestamp = 0;
    
    // Check localStorage users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    console.log('Registered users:', users);
    
    const found = users.find((u: any) => u.email === email && u.password === password);
    console.log('Found user:', found);
    
    if (found) {
      const userData = {
        name: found.name,
        email: found.email,
        role: found.role,
        isLoggedIn: true
      };
      console.log('Saving to localStorage:', userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      this.cachedUser = userData;
      this.cacheTimestamp = Date.now();
      console.log('Saved! Verify:', localStorage.getItem('currentUser'));
      return true;
    }

    // Hardcoded fallback admin
    if (email === 'admin@elearn.com' && password === 'admin123') {
      const adminData = {
        name: 'Admin User',
        email: email,
        role: 'ADMIN',
        isLoggedIn: true
      };
      console.log('Using hardcoded admin. Saving:', adminData);
      localStorage.setItem('currentUser', JSON.stringify(adminData));
      this.cachedUser = adminData;
      this.cacheTimestamp = Date.now();
      console.log('Saved! Verify:', localStorage.getItem('currentUser'));
      return true;
    }

    console.log('Login FAILED - no match found');
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.cachedUser = null;
    this.cacheTimestamp = 0;
    this.router.navigate(['/login']);
  }

  private cachedUser: User | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_DURATION = 1000; // 1 seconde

  getUser(): User | null {
    const now = Date.now();
    
    // Utiliser le cache si disponible et valide
    if (this.cachedUser && (now - this.cacheTimestamp) < this.CACHE_DURATION) {
      return this.cachedUser;
    }
    
    const data = localStorage.getItem('currentUser');
    this.cachedUser = data ? JSON.parse(data) : null;
    this.cacheTimestamp = now;
    
    return this.cachedUser;
  }

  getRole(): string {
    return this.getUser()?.role || '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  getUserName(): string {
    return this.getUser()?.name || '';
  }
}
