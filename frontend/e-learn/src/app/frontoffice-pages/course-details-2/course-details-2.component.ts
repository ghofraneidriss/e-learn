import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-details-2-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-details-2.component.html',
  styleUrl: './course-details-2.component.css'
})
export class CourseDetails2FrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/course-details-2.html';
  readonly pageTitle = 'frontoffice-course-details-2';
}
