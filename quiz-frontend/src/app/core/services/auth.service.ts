import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = `${environment.apiUrl}/auth`;

  currentUser = signal<AuthResponse | null>(this.getUserFromStorage());

  constructor(private http: HttpClient, private router: Router) {}

  register(request: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.API}/register`, request).pipe(
      tap(res => this.saveUser(res))
    );
  }

  login(request: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.API}/login`, request).pipe(
      tap(res => this.saveUser(res))
    );
  }

  refreshToken(): Observable<{ token: string; refreshToken: string }> {
    const user = this.currentUser();
    return this.http.post<{ token: string; refreshToken: string }>(
      `${this.API}/refresh`,
      { refreshToken: user?.refreshToken }
    ).pipe(
      tap(res => {
        const updated = { ...this.currentUser()!, token: res.token, refreshToken: res.refreshToken };
        this.saveUser(updated);
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.currentUser()?.token ?? null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  hasRole(...roles: string[]): boolean {
    const role = this.currentUser()?.role;
    return !!role && roles.includes(role);
  }

  private saveUser(user: AuthResponse) {
    localStorage.setItem('auth_user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  private getUserFromStorage(): AuthResponse | null {
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  }
}
