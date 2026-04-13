import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    
    console.log('=== LOGIN FORM SUBMIT ===');
    console.log('Email input:', this.email);
    console.log('Password input:', this.password);
    
    const success = this.authService.login(this.email, this.password);
    console.log('Login result:', success);
    
    if (success) {
      console.log('Login SUCCESS - navigating to /dashboard');
      console.log('Navigation en cours...');
      
      // Force la navigation avec NgZone
      this.ngZone.run(() => {
        this.router.navigate(['/dashboard']).then(nav => {
          console.log('Navigation réussie ?', nav);
          if (!nav) {
            console.error('Navigation échouée - tentative de rechargement');
            window.location.href = '/dashboard';
          }
        }, err => {
          console.error('Erreur de navigation :', err);
          // Fallback: rechargement de la page
          window.location.href = '/dashboard';
        });
      });
    } else {
      console.log('Login FAILED - showing error message');
      this.errorMessage = 'Identifiants incorrects';
    }
  }
}
