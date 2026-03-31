import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-courses-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css'
})
export class StudentCoursesFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-courses.html';
  readonly pageTitle = 'frontoffice-student-courses';
}
