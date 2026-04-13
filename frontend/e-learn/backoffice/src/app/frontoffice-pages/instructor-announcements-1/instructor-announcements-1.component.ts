import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-announcements-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-announcements-1.component.html',
  styleUrl: './instructor-announcements-1.component.css'
})
export class InstructorAnnouncements1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-announcements-1.html';
  readonly pageTitle = 'frontoffice-instructor-announcements-1';
}
