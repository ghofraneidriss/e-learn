import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: false
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'ETUDIANT'
  };
  
  errorMessage = '';
  successMessage = '';

  constructor(private readonly router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // Validate all fields
    if (!this.formData.name || !this.formData.email || !this.formData.password || !this.formData.role) {
      this.errorMessage = 'Tous les champs sont obligatoires';
      return;
    }

    // Check password match
    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    // Check password length
    if (this.formData.password.length < 6) {
      this.errorMessage = 'Mot de passe minimum 6 caractères';
      return;
    }

    // Check email uniqueness
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.email === this.formData.email)) {
      this.errorMessage = 'Email déjà utilisé';
      return;
    }

    // Save user
    users.push({
      name: this.formData.name,
      email: this.formData.email,
      password: this.formData.password,
      role: this.formData.role,
      createdAt: new Date()
    });
    localStorage.setItem('users', JSON.stringify(users));

    this.successMessage = 'Compte créé avec succès ! Redirection...';
    this.errorMessage = '';

    setTimeout(() => this.router.navigate(['/login']), 1500);
  }
}
