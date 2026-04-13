import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: false
})
export class ProfileComponent implements OnInit {
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
  }

  getRoleLabel(): string {
    const roles: any = {
      'ADMIN': 'Administrateur',
      'PROF': 'Professeur',
      'ETUDIANT': 'Étudiant'
    };
    return roles[this.currentUser?.role] || this.currentUser?.role;
  }

  getUserInitial(): string {
    return this.currentUser?.name?.charAt(0)?.toUpperCase() || 'U';
  }

  editProfile(): void {
    // TODO: Implement edit profile functionality
    console.log('Edit profile clicked');
  }

  logout(): void {
    this.authService.logout();
  }
}
