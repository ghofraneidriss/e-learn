import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-resume-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-resume.component.html',
  styleUrl: './course-resume.component.css'
})
export class CourseResumeFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/course-resume.html';
  readonly pageTitle = 'frontoffice-course-resume';
}
