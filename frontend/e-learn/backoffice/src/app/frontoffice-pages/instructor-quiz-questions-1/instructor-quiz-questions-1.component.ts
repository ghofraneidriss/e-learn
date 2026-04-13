import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-quiz-questions-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-quiz-questions-1.component.html',
  styleUrl: './instructor-quiz-questions-1.component.css'
})
export class InstructorQuizQuestions1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-quiz-questions-1.html';
  readonly pageTitle = 'frontoffice-instructor-quiz-questions-1';
}
