import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-change-password-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-change-password.component.html',
  styleUrl: './student-change-password.component.css'
})
export class StudentChangePasswordFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-change-password.html';
  readonly pageTitle = 'frontoffice-student-change-password';
}
