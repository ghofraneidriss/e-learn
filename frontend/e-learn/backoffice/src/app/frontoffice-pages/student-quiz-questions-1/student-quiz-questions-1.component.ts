import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-quiz-questions-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-quiz-questions-1.component.html',
  styleUrl: './student-quiz-questions-1.component.css'
})
export class StudentQuizQuestions1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-quiz-questions-1.html';
  readonly pageTitle = 'frontoffice-student-quiz-questions-1';
}
