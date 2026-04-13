import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-message-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-message-1.component.html',
  styleUrl: './instructor-message-1.component.css'
})
export class InstructorMessage1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-message-1.html';
  readonly pageTitle = 'frontoffice-instructor-message-1';
}
