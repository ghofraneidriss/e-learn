import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-resume-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-resume-1.component.html',
  styleUrl: './course-resume-1.component.css'
})
export class CourseResume1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/course-resume-1.html';
  readonly pageTitle = 'frontoffice-course-resume-1';
}
