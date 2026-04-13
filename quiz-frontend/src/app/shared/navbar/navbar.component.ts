import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(public auth: AuthService, public notifService: NotificationService) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.notifService.startPolling();
    }
  }

  ngOnDestroy() {
    this.notifService.stopPolling();
  }
}
