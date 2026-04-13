import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-messages-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-messages.component.html',
  styleUrl: './student-messages.component.css'
})
export class StudentMessagesFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-messages.html';
  readonly pageTitle = 'frontoffice-student-messages';
}
