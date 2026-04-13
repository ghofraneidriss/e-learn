import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-notifications-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-notifications-1.component.html',
  styleUrl: './instructor-notifications-1.component.css'
})
export class InstructorNotifications1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-notifications-1.html';
  readonly pageTitle = 'frontoffice-instructor-notifications-1';
}
