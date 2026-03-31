import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-grid-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-grid.component.html',
  styleUrl: './course-grid.component.css'
})
export class CourseGridFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/course-grid.html';
  readonly pageTitle = 'frontoffice-course-grid';
}
