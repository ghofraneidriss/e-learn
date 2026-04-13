import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-about-courses-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './about-courses.component.html',
  styleUrl: './about-courses.component.css'
})
export class AboutCoursesPageComponent {
  readonly pagePath = 'xhtml/about-courses.html';
  readonly pageTitle = 'about-courses';
}
