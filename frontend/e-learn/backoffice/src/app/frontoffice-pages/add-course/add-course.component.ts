import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-add-course-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/add-course.html';
  readonly pageTitle = 'frontoffice-add-course';
}
