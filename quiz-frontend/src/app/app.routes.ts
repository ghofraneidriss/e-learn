import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/offres', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },

  // Student routes
  {
    path: 'offres',
    loadComponent: () =>
      import('./features/student/offre-list/offre-list.component').then(m => m.OffreListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'mes-abonnements',
    loadComponent: () =>
      import('./features/student/mes-abonnements/mes-abonnements.component').then(m => m.MesAbonnementsComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ETUDIANT'] }
  },

  // Enseignant / Admin routes
  {
    path: 'enseignant/offres',
    loadComponent: () =>
      import('./features/enseignant/offre-list/offre-list.component').then(m => m.EnseignantOffreListComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ENSEIGNANT', 'ADMIN'] }
  },
  {
    path: 'enseignant/offres/nouvelle',
    loadComponent: () =>
      import('./features/enseignant/offre-form/offre-form.component').then(m => m.OffreFormComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ENSEIGNANT', 'ADMIN'] }
  },
  {
    path: 'enseignant/offres/edit/:id',
    loadComponent: () =>
      import('./features/enseignant/offre-form/offre-form.component').then(m => m.OffreFormComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ENSEIGNANT', 'ADMIN'] }
  },

  {
    path: 'notifications',
    loadComponent: () =>
      import('./features/notifications/notifications.component').then(m => m.NotificationsComponent),
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: '/offres' }
];
