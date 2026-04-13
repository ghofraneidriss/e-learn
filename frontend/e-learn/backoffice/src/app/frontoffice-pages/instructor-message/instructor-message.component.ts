import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-message-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-message.component.html',
  styleUrl: './instructor-message.component.css'
})
export class InstructorMessageFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-message.html';
  readonly pageTitle = 'frontoffice-instructor-message';
}
