import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-notifications-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './notifications-1.component.html',
  styleUrl: './notifications-1.component.css'
})
export class Notifications1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/notifications-1.html';
  readonly pageTitle = 'frontoffice-notifications-1';
}
