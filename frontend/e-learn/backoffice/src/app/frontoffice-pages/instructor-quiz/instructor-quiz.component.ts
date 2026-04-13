import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-quiz-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-quiz.component.html',
  styleUrl: './instructor-quiz.component.css'
})
export class InstructorQuizFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-quiz.html';
  readonly pageTitle = 'frontoffice-instructor-quiz';
}
