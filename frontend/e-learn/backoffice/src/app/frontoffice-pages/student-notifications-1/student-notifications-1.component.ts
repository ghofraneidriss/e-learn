import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-notifications-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-notifications-1.component.html',
  styleUrl: './student-notifications-1.component.css'
})
export class StudentNotifications1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-notifications-1.html';
  readonly pageTitle = 'frontoffice-student-notifications-1';
}
