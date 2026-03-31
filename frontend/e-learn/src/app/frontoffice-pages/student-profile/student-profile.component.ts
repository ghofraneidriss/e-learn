import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-profile-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-profile.html';
  readonly pageTitle = 'frontoffice-student-profile';
}
