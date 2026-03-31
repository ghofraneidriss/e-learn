import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-category-2-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-category-2.component.html',
  styleUrl: './course-category-2.component.css'
})
export class CourseCategory2FrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/course-category-2.html';
  readonly pageTitle = 'frontoffice-course-category-2';
}
