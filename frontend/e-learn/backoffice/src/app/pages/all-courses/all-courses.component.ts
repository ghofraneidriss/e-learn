import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-all-courses-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesPageComponent {
  readonly pagePath = 'xhtml/all-courses.html';
  readonly pageTitle = 'all-courses';
}
