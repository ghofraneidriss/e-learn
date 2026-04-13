import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-social-profiles-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-social-profiles.component.html',
  styleUrl: './instructor-social-profiles.component.css'
})
export class InstructorSocialProfilesFrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-social-profiles.html';
  readonly pageTitle = 'frontoffice-instructor-social-profiles';
}
