import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-quiz-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-quiz-1.component.html',
  styleUrl: './student-quiz-1.component.css'
})
export class StudentQuiz1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-quiz-1.html';
  readonly pageTitle = 'frontoffice-student-quiz-1';
}
