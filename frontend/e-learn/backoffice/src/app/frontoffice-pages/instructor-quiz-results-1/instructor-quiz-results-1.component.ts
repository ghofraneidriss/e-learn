import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-quiz-results-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-quiz-results-1.component.html',
  styleUrl: './instructor-quiz-results-1.component.css'
})
export class InstructorQuizResults1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-quiz-results-1.html';
  readonly pageTitle = 'frontoffice-instructor-quiz-results-1';
}
