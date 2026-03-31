import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-add-courses-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.css'
})
export class AddCoursesPageComponent {
  readonly pagePath = 'xhtml/add-courses.html';
  readonly pageTitle = 'add-courses';
}
