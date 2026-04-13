import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-course-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-course-1.component.html',
  styleUrl: './instructor-course-1.component.css'
})
export class InstructorCourse1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-course-1.html';
  readonly pageTitle = 'frontoffice-instructor-course-1';
}
