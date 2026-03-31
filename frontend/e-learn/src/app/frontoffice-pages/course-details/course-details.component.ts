import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-details-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/course-details.html';
  readonly pageTitle = 'frontoffice-course-details';
}
