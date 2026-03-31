import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-quiz-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-quiz.component.html',
  styleUrl: './student-quiz.component.css'
})
export class StudentQuizFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-quiz.html';
  readonly pageTitle = 'frontoffice-student-quiz';
}
