import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-course-grid-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-course-grid.component.html',
  styleUrl: './instructor-course-grid.component.css'
})
export class InstructorCourseGridFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-course-grid.html';
  readonly pageTitle = 'frontoffice-instructor-course-grid';
}
