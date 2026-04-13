import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-change-password-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-change-password-1.component.html',
  styleUrl: './student-change-password-1.component.css'
})
export class StudentChangePassword1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-change-password-1.html';
  readonly pageTitle = 'frontoffice-student-change-password-1';
}
