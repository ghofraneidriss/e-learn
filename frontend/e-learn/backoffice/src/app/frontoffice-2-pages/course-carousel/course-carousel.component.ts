import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-course-carousel-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './course-carousel.component.html',
  styleUrl: './course-carousel.component.css'
})
export class CourseCarouselFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/course-carousel.html';
  readonly pageTitle = 'frontoffice-2-course-carousel';
}
