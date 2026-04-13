import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-list-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-list-1.component.html',
  styleUrl: './course-list-1.component.css'
})
export class CourseList1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/course-list-1.html';
  readonly pageTitle = 'frontoffice-course-list-1';
}
