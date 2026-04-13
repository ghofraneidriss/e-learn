import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): boolean {
    console.log('=== AUTH GUARD ===');
    const isLoggedIn = this.authService.isLoggedIn();
    console.log('User is logged in:', isLoggedIn);
    
    if (isLoggedIn) {
      console.log('Access GRANTED - allowing navigation');
      return true;
    }
    
    console.log('Access DENIED - redirecting to /login');
    this.router.navigate(['/login']);
    return false;
  }
}
