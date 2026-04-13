import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.css',
  standalone: false
})
export class NavHeaderComponent {
  showProfileMenu: boolean = false;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  getUserName(): string {
    return this.authService.getUserName() || 'User';
  }

  getUserRole(): string {
    const role = this.authService.getRole();
    const labels: Record<string, string> = {
      'ADMIN': 'Administrateur',
      'PROF': 'Professeur',
      'ETUDIANT': 'Étudiant'
    };
    return labels[role] || role;
  }

  getUserInitial(): string {
    const name = this.getUserName();
    return name.charAt(0).toUpperCase();
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.showProfileMenu = false;
    this.authService.logout();
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  closeProfileMenu(): void {
    this.showProfileMenu = false;
  }
}