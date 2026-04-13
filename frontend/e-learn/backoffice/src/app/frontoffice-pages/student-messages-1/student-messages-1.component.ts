import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-messages-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-messages-1.component.html',
  styleUrl: './student-messages-1.component.css'
})
export class StudentMessages1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-messages-1.html';
  readonly pageTitle = 'frontoffice-student-messages-1';
}
