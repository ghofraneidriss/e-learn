import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-category-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-category-1.component.html',
  styleUrl: './course-category-1.component.css'
})
export class CourseCategory1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/course-category-1.html';
  readonly pageTitle = 'frontoffice-course-category-1';
}
