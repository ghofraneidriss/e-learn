import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-reviews-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-reviews-1.component.html',
  styleUrl: './student-reviews-1.component.css'
})
export class StudentReviews1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-reviews-1.html';
  readonly pageTitle = 'frontoffice-student-reviews-1';
}
