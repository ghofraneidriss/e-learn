import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-grid-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-grid-1.component.html',
  styleUrl: './course-grid-1.component.css'
})
export class CourseGrid1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/course-grid-1.html';
  readonly pageTitle = 'frontoffice-course-grid-1';
}
