import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-edit-courses-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './edit-courses.component.html',
  styleUrl: './edit-courses.component.css'
})
export class EditCoursesPageComponent {
  readonly pagePath = 'xhtml/edit-courses.html';
  readonly pageTitle = 'edit-courses';
}
