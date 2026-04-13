import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-quiz-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-quiz-1.component.html',
  styleUrl: './instructor-quiz-1.component.css'
})
export class InstructorQuiz1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-quiz-1.html';
  readonly pageTitle = 'frontoffice-instructor-quiz-1';
}
