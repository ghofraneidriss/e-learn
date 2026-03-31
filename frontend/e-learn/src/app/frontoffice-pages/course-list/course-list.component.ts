import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-list-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/course-list.html';
  readonly pageTitle = 'frontoffice-course-list';
}
