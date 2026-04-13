import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { Notification } from '../../core/models/notification.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  error = '';

  constructor(private notifService: NotificationService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.notifService.getMesNotifications().subscribe({
      next: data => this.notifications = data.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
      error: () => this.error = 'Impossible de charger les notifications.'
    });
  }

  marquerLu(notif: Notification) {
    if (notif.lu) return;
    this.notifService.marquerLu(notif.id).subscribe({
      next: () => {
        notif.lu = true;
        this.notifService.unreadCount.update(n => Math.max(0, n - 1));
      }
    });
  }

  supprimer(id: number) {
    this.notifService.deleteNotification(id).subscribe({
      next: () => {
        const removed = this.notifications.find(n => n.id === id);
        if (removed && !removed.lu) this.notifService.unreadCount.update(n => Math.max(0, n - 1));
        this.notifications = this.notifications.filter(n => n.id !== id);
      }
    });
  }

  marquerTousLus() {
    this.notifications.filter(n => !n.lu).forEach(n => this.marquerLu(n));
  }
}
