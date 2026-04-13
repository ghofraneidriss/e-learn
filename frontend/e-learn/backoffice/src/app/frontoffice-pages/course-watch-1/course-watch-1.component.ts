import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-watch-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-watch-1.component.html',
  styleUrl: './course-watch-1.component.css'
})
export class CourseWatch1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/course-watch-1.html';
  readonly pageTitle = 'frontoffice-course-watch-1';
}
