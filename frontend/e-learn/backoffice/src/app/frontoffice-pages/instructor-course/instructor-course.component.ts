import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-course-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-course.component.html',
  styleUrl: './instructor-course.component.css'
})
export class InstructorCourseFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-course.html';
  readonly pageTitle = 'frontoffice-instructor-course';
}
