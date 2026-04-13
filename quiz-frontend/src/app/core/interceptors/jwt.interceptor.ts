import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now() - 10000; // 10s buffer
  } catch {
    return false;
  }
}

function addToken(req: HttpRequest<unknown>, token: string) {
  return req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
}

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  // Never add auth header to auth endpoints (avoids deadlock on refresh)
  if (req.url.includes('/auth/login') || req.url.includes('/auth/refresh') || req.url.includes('/auth/register')) {
    return next(req);
  }

  const token = auth.getToken();
  if (!token) return next(req);

  // Proactively refresh if token is already expired
  if (isTokenExpired(token) && auth.currentUser()?.refreshToken) {
    return auth.refreshToken().pipe(
      switchMap(res => next(addToken(req, res.token))),
      catchError(() => {
        auth.logout();
        return throwError(() => new Error('Session expirée'));
      })
    );
  }

  // Token is valid — attach it and handle any 401 reactively as fallback
  return next(addToken(req, token)).pipe(
    catchError(err => {
      if (err.status === 401 && auth.currentUser()?.refreshToken && !req.url.includes('/auth/')) {
        return auth.refreshToken().pipe(
          switchMap(res => next(addToken(req, res.token))),
          catchError(() => {
            auth.logout();
            return throwError(() => err);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
