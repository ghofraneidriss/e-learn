import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models/notification.model';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly BASE = `${environment.apiUrl}/notifications`;

  unreadCount = signal<number>(0);

  private intervalId: any;

  constructor(private http: HttpClient, private auth: AuthService) {}

  startPolling() {
    this.loadUnread();
    this.intervalId = setInterval(() => this.loadUnread(), 30000);
  }

  stopPolling() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private loadUnread() {
    const email = this.auth.currentUser()?.email;
    if (!email) return;
    this.http.get<Notification[]>(`${this.BASE}/user/${encodeURIComponent(email)}/non-lues`)
      .subscribe({ next: list => this.unreadCount.set(list.length), error: () => {} });
  }

  getMesNotifications() {
    const email = this.auth.currentUser()?.email;
    return this.http.get<Notification[]>(`${this.BASE}/user/${encodeURIComponent(email!)}`);
  }

  marquerLu(id: number) {
    return this.http.patch<Notification>(`${this.BASE}/${id}/marquer-lu`, {}).pipe();
  }

  deleteNotification(id: number) {
    return this.http.delete<void>(`${this.BASE}/${id}`);
  }
}
