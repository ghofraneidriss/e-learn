import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-courses-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-courses-1.component.html',
  styleUrl: './student-courses-1.component.css'
})
export class StudentCourses1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-courses-1.html';
  readonly pageTitle = 'frontoffice-student-courses-1';
}
