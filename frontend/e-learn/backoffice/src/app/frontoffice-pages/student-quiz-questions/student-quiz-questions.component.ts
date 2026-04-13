import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-quiz-questions-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-quiz-questions.component.html',
  styleUrl: './student-quiz-questions.component.css'
})
export class StudentQuizQuestionsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-quiz-questions.html';
  readonly pageTitle = 'frontoffice-student-quiz-questions';
}
