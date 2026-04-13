import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-profile-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-profile.component.html',
  styleUrl: './instructor-profile.component.css'
})
export class InstructorProfileFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-profile.html';
  readonly pageTitle = 'frontoffice-instructor-profile';
}
