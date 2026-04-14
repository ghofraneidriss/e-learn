import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    template: `
    <header class="navbar">
      <div class="search-box">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="Search Here">
      </div>
      <div class="user-actions">
        <button class="icon-btn">
          <i class="fa fa-bell"></i>
          <span class="badge"></span>
        </button>
        <div class="user-profile">
          <div class="user-info text-right">
            <span class="user-name">Admin User</span>
            <span class="user-role">Administrateur</span>
          </div>
          <img src="/frontoffice/eduact-html/assets/images/resources/team-1-1.jpg" alt="Admin" class="avatar">
        </div>
      </div>
    </header>
  `,
    styles: [`
    .navbar {
      height: 70px;
      background: #ffffff;
      border-bottom: 1px solid #e6ebf4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      position: sticky;
      top: 0;
      z-index: 999;
    }
    .search-box {
      background: #f8fafc;
      border-radius: 30px;
      padding: 8px 18px;
      display: flex;
      align-items: center;
      gap: 10px;
      width: 300px;
    }
    .search-box input {
      border: none;
      background: transparent;
      outline: none;
      width: 100%;
      font-size: 14px;
    }
    .user-actions {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    .icon-btn {
      background: transparent;
      border: none;
      font-size: 20px;
      color: #64748b;
      position: relative;
      cursor: pointer;
    }
    .badge {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 8px;
      height: 8px;
      background: #ef4444;
      border-radius: 50%;
      border: 2px solid #fff;
    }
    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .user-info {
      display: flex;
      flex-direction: column;
    }
    .user-name {
      font-weight: 700;
      color: #1e293b;
      font-size: 14px;
    }
    .user-role {
      font-size: 12px;
      color: #3b5ae6;
      font-weight: 500;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
    .text-right { text-align: right; }
  `]
})
export class NavbarComponent { }
