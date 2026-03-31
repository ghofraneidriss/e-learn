import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-category-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-category.component.html',
  styleUrl: './course-category.component.css'
})
export class CourseCategoryFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/course-category.html';
  readonly pageTitle = 'frontoffice-course-category';
}
