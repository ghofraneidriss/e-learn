import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="sidebar">
      <div class="sidebar-logo">
        <img src="/frontoffice/eduact-html/assets/images/logo-two.png" alt="Logo" width="150" height="40">
      </div>
      <nav class="sidebar-nav">
        <div class="menu-label">MAIN MENU</div>
        <ul>
          <li *ngFor="let item of menuItems">
            <a [routerLink]="item.route" routerLinkActive="active">
              <i class="fa" [ngClass]="'fa-' + item.icon"></i>
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
    styles: [`
    .sidebar {
      width: 260px;
      height: 100vh;
      background: #ffffff;
      border-right: 1px solid #e6ebf4;
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
    }
    .sidebar-logo {
      padding: 24px;
      border-bottom: 1px solid #f0f4f8;
      display: flex;
      justify-content: center;
    }
    .sidebar-nav {
      flex: 1;
      padding: 20px 0;
      overflow-y: auto;
    }
    .menu-label {
      padding: 0 24px 10px;
      font-size: 11px;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li a {
      display: flex;
      align-items: center;
      padding: 12px 24px;
      color: #64748b;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s ease;
      gap: 12px;
    }
    li a i {
      width: 20px;
      text-align: center;
      font-size: 16px;
    }
    li a:hover {
      background: #f8faff;
      color: #3b5ae6;
    }
    li a.active {
      background: #f0f4ff;
      color: #3b5ae6;
      border-right: 3px solid #3b5ae6;
    }
  `]
})
export class SidebarComponent {
    menuItems = [
        { label: 'Dashboard', icon: 'th-large', route: '/admin/dashboard' },
        { label: 'Professors', icon: 'user-tie', route: '/admin/professors' },
        { label: 'Students', icon: 'user-graduate', route: '/admin/students' },
        { label: 'Courses', icon: 'book', route: '/admin/courses' },
        { label: 'Departments', icon: 'building', route: '/admin/departments' },
        { label: 'Staff', icon: 'users', route: '/admin/staff' },
        { label: 'Feedbacks', icon: 'comments', route: '/admin/feedbacks' },
        { label: 'Reclamations', icon: 'exclamation-circle', route: '/admin/reclamations' },
        { label: 'Fees', icon: 'dollar-sign', route: '/admin/fees' },
        { label: 'Library', icon: 'book-reader', route: '/admin/library' },
        { label: 'Holiday', icon: 'calendar-alt', route: '/admin/holiday' },
        { label: 'Profile', icon: 'user', route: '/admin/profile' },
    ];
}
