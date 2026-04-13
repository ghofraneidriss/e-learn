import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-watch-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-watch.component.html',
  styleUrl: './course-watch.component.css'
})
export class CourseWatchFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/course-watch.html';
  readonly pageTitle = 'frontoffice-course-watch';
}
