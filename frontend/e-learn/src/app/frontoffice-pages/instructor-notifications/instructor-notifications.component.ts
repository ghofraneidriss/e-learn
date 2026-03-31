import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-notifications-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-notifications.component.html',
  styleUrl: './instructor-notifications.component.css'
})
export class InstructorNotificationsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-notifications.html';
  readonly pageTitle = 'frontoffice-instructor-notifications';
}
