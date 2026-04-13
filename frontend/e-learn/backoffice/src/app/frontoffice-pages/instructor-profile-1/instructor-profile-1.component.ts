import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-profile-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-profile-1.component.html',
  styleUrl: './instructor-profile-1.component.css'
})
export class InstructorProfile1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-profile-1.html';
  readonly pageTitle = 'frontoffice-instructor-profile-1';
}
