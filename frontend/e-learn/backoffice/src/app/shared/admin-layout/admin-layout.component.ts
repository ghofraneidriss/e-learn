import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, SidebarComponent, NavbarComponent],
    template: `
    <div class="admin-wrapper">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-navbar></app-navbar>
        <main class="content-area">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
    styles: [`
    .admin-wrapper {
      display: flex;
      background: #f8fafc;
      min-height: 100vh;
    }
    .main-content {
      flex: 1;
      margin-left: 260px;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .content-area {
      padding: 30px;
      flex: 1;
    }
  `]
})
export class AdminLayoutComponent { }
