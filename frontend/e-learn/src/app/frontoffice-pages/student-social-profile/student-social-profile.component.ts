import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-social-profile-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-social-profile.component.html',
  styleUrl: './student-social-profile.component.css'
})
export class StudentSocialProfileFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-social-profile.html';
  readonly pageTitle = 'frontoffice-student-social-profile';
}
