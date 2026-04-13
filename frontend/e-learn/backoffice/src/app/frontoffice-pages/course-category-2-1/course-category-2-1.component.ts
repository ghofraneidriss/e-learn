import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-category-2-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-category-2-1.component.html',
  styleUrl: './course-category-2-1.component.css'
})
export class CourseCategory21FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/course-category-2-1.html';
  readonly pageTitle = 'frontoffice-course-category-2-1';
}
