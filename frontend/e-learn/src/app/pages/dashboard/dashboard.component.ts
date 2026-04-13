import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false
})
export class DashboardComponent implements OnInit {
  user: any;
  userName: string = '';
  userRole: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.userName = this.user?.name || 'Utilisateur';
    const roles: any = {
      'ADMIN': 'Administrateur',
      'PROF': 'Professeur',
      'ETUDIANT': 'Étudiant'
    };
    this.userRole = roles[this.user?.role] || '';
  }
}
