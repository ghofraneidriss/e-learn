import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-announcements-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-announcements.component.html',
  styleUrl: './instructor-announcements.component.css'
})
export class InstructorAnnouncementsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-announcements.html';
  readonly pageTitle = 'frontoffice-instructor-announcements';
}
