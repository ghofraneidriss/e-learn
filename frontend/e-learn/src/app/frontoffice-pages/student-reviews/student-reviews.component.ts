import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-reviews-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-reviews.component.html',
  styleUrl: './student-reviews.component.css'
})
export class StudentReviewsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-reviews.html';
  readonly pageTitle = 'frontoffice-student-reviews';
}
