# Angular Integration Guide for User Service

## 🎯 Overview

This guide shows how to integrate the Symfony user service with your Angular frontend.

## 🔐 Authentication Service

### auth.service.ts

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface KeycloakToken {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
}

export interface User {
  id: string;
  keycloakId: string;
  email: string;
  name: string;
  roles: string[];
  active: boolean;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloakUrl = 'http://localhost:8081';
  private realm = 'elearning';
  private clientId = 'elearning-client';
  private clientSecret = 'your-client-secret';
  
  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('access_token')
  );
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  login(username: string, password: string): Observable<KeycloakToken> {
    const url = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    
    const body = new URLSearchParams();
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', 'password');

    return this.http.post<KeycloakToken>(url, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).pipe(
      tap(token => {
        localStorage.setItem('access_token', token.access_token);
        localStorage.setItem('refresh_token', token.refresh_token);
        this.tokenSubject.next(token.access_token);
        this.loadCurrentUser();
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.tokenSubject.next(null);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private loadCurrentUser(): void {
    const token = this.getToken();
    if (token) {
      // Token will be added by interceptor
      this.http.get<{success: boolean, data: User}>('http://localhost:8085/api/users/me')
        .subscribe({
          next: (response) => {
            this.currentUserSubject.next(response.data);
          },
          error: () => {
            this.logout();
          }
        });
    }
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.roles.includes(`ROLE_${role.toUpperCase()}`) || false;
  }

  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  isProf(): boolean {
    return this.hasRole('PROF');
  }

  isStudent(): boolean {
    return this.hasRole('ETUDIANT');
  }
}
```

## 🔌 HTTP Interceptor

### auth.interceptor.ts

```typescript
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
```

### Register in app.module.ts

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  // ...
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
```

## 👤 User Service

### user.service.ts

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: string;
  keycloakId: string;
  email: string;
  name: string;
  roles: string[];
  active: boolean;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8085/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(this.apiUrl)
      .pipe(map(response => response.data || []));
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data!));
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/me`)
      .pipe(map(response => response.data!));
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<ApiResponse<User>>(this.apiUrl, user)
      .pipe(map(response => response.data!));
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/${id}`, user)
      .pipe(map(response => response.data!));
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/role/${role}`)
      .pipe(map(response => response.data || []));
  }

  getActiveUsers(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/active`)
      .pipe(map(response => response.data || []));
  }
}
```

## 🔒 Auth Guard

### auth.guard.ts

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      const requiredRole = route.data['role'];
      
      if (requiredRole && !this.authService.hasRole(requiredRole)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
```

### role.guard.ts

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];
    
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const hasRole = requiredRoles.some(role => this.authService.hasRole(role));
    
    if (!hasRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
```

## 🛣️ Routing Configuration

### app-routing.module.ts

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  { 
    path: 'courses', 
    component: CoursesComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## 📄 Component Examples

### login.component.ts

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.loading = true;
    this.error = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'Invalid username or password';
        this.loading = false;
      }
    });
  }
}
```

### login.component.html

```html
<div class="login-container">
  <h2>E-Learning Platform</h2>
  <form (ngSubmit)="login()">
    <div class="form-group">
      <label>Username</label>
      <input 
        type="text" 
        [(ngModel)]="username" 
        name="username"
        required
        class="form-control">
    </div>
    
    <div class="form-group">
      <label>Password</label>
      <input 
        type="password" 
        [(ngModel)]="password" 
        name="password"
        required
        class="form-control">
    </div>
    
    <div *ngIf="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <button 
      type="submit" 
      [disabled]="loading"
      class="btn btn-primary">
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>
  </form>
</div>
```

### profile.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  getRoleBadgeClass(role: string): string {
    if (role.includes('ADMIN')) return 'badge-danger';
    if (role.includes('PROF')) return 'badge-warning';
    if (role.includes('ETUDIANT')) return 'badge-info';
    return 'badge-secondary';
  }
}
```

### profile.component.html

```html
<div class="profile-container" *ngIf="user">
  <div class="card">
    <div class="card-header">
      <h3>My Profile</h3>
    </div>
    <div class="card-body">
      <div class="profile-avatar">
        <img [src]="user.avatar || 'assets/default-avatar.png'" alt="Avatar">
      </div>
      
      <div class="profile-info">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Phone:</strong> {{ user.phone || 'Not provided' }}</p>
        <p><strong>Status:</strong> 
          <span [class]="user.active ? 'badge badge-success' : 'badge badge-danger'">
            {{ user.active ? 'Active' : 'Inactive' }}
          </span>
        </p>
        <p><strong>Roles:</strong>
          <span *ngFor="let role of user.roles" 
                [class]="'badge ' + getRoleBadgeClass(role)"
                style="margin-right: 5px;">
            {{ role }}
          </span>
        </p>
        <p><strong>Member since:</strong> {{ user.createdAt | date:'medium' }}</p>
      </div>
    </div>
  </div>
</div>
```

### user-list.component.ts (Admin)

```typescript
import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.loading = false;
      }
    });
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        }
      });
    }
  }
}
```

## 🎨 Directives

### has-role.directive.ts

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string | string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const roles = Array.isArray(this.appHasRole) ? this.appHasRole : [this.appHasRole];
    const hasRole = roles.some(role => this.authService.hasRole(role));

    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
```

### Usage

```html
<button *appHasRole="'ADMIN'" (click)="deleteUser()">Delete</button>
<div *appHasRole="['ADMIN', 'PROF']">Admin or Professor content</div>
```

## 🧪 Testing

### auth.service.spec.ts

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should login successfully', () => {
    const mockToken = {
      access_token: 'test-token',
      expires_in: 300,
      refresh_expires_in: 1800,
      refresh_token: 'refresh-token',
      token_type: 'Bearer'
    };

    service.login('testuser', 'password').subscribe(token => {
      expect(token.access_token).toBe('test-token');
      expect(localStorage.getItem('access_token')).toBe('test-token');
    });

    const req = httpMock.expectOne(request => 
      request.url.includes('/protocol/openid-connect/token')
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockToken);
  });

  it('should check if user is authenticated', () => {
    localStorage.setItem('access_token', 'test-token');
    expect(service.isAuthenticated()).toBe(true);
    
    localStorage.removeItem('access_token');
    expect(service.isAuthenticated()).toBe(false);
  });
});
```

## 📦 Environment Configuration

### environment.ts

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8085',
  keycloakUrl: 'http://localhost:8081',
  keycloakRealm: 'elearning',
  keycloakClientId: 'elearning-client'
};
```

### environment.prod.ts

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.elearning.tn',
  keycloakUrl: 'https://auth.elearning.tn',
  keycloakRealm: 'elearning',
  keycloakClientId: 'elearning-client'
};
```

## ✅ Integration Checklist

- [ ] AuthService implemented
- [ ] HTTP Interceptor configured
- [ ] UserService implemented
- [ ] Auth Guard implemented
- [ ] Role Guard implemented
- [ ] Login component created
- [ ] Profile component created
- [ ] Has-role directive created
- [ ] Routes protected with guards
- [ ] Error handling implemented
- [ ] Token refresh logic added (optional)

---

**Angular Integration Complete!** 🎉 Your frontend is now ready to communicate with the Symfony user service.
