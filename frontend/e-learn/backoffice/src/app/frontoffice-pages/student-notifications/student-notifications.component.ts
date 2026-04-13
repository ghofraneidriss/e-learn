import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-notifications-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-notifications.component.html',
  styleUrl: './student-notifications.component.css'
})
export class StudentNotificationsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-notifications.html';
  readonly pageTitle = 'frontoffice-student-notifications';
}
