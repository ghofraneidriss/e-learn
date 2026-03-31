import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-quiz-questions-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-quiz-questions.component.html',
  styleUrl: './instructor-quiz-questions.component.css'
})
export class InstructorQuizQuestionsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-quiz-questions.html';
  readonly pageTitle = 'frontoffice-instructor-quiz-questions';
}
