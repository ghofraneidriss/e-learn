import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-social-profile-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-social-profile-1.component.html',
  styleUrl: './student-social-profile-1.component.css'
})
export class StudentSocialProfile1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-social-profile-1.html';
  readonly pageTitle = 'frontoffice-student-social-profile-1';
}
