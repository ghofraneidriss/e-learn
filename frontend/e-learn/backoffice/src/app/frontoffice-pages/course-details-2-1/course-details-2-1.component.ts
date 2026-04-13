import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-details-2-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-details-2-1.component.html',
  styleUrl: './course-details-2-1.component.css'
})
export class CourseDetails21FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/course-details-2-1.html';
  readonly pageTitle = 'frontoffice-course-details-2-1';
}
