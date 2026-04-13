import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-change-password-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-change-password.component.html',
  styleUrl: './instructor-change-password.component.css'
})
export class InstructorChangePasswordFrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-change-password.html';
  readonly pageTitle = 'frontoffice-instructor-change-password';
}
