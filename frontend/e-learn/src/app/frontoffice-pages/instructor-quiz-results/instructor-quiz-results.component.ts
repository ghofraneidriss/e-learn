import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-quiz-results-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-quiz-results.component.html',
  styleUrl: './instructor-quiz-results.component.css'
})
export class InstructorQuizResultsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-quiz-results.html';
  readonly pageTitle = 'frontoffice-instructor-quiz-results';
}
