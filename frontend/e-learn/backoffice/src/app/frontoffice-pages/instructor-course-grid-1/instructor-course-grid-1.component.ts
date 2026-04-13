import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-course-grid-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-course-grid-1.component.html',
  styleUrl: './instructor-course-grid-1.component.css'
})
export class InstructorCourseGrid1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-course-grid-1.html';
  readonly pageTitle = 'frontoffice-instructor-course-grid-1';
}
