import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-notifications-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/notifications.html';
  readonly pageTitle = 'frontoffice-notifications';
}
