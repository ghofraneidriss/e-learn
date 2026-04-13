import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-add-course-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './add-course-1.component.html',
  styleUrl: './add-course-1.component.css'
})
export class AddCourse1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/add-course-1.html';
  readonly pageTitle = 'frontoffice-add-course-1';
}
