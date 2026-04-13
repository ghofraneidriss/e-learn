import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-profile-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-profile-1.component.html',
  styleUrl: './student-profile-1.component.css'
})
export class StudentProfile1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-profile-1.html';
  readonly pageTitle = 'frontoffice-student-profile-1';
}
