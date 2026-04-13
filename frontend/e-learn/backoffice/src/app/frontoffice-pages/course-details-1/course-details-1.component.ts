import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-course-details-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-details-1.component.html',
  styleUrl: './course-details-1.component.css'
})
export class CourseDetails1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/course-details-1.html';
  readonly pageTitle = 'frontoffice-course-details-1';
}
