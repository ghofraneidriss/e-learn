import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-category-3-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-category-3.component.html',
  styleUrl: './course-category-3.component.css'
})
export class CourseCategory3FrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/course-category-3.html';
  readonly pageTitle = 'frontoffice-course-category-3';
}
