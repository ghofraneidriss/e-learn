import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-referral-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-referral-1.component.html',
  styleUrl: './student-referral-1.component.css'
})
export class StudentReferral1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-referral-1.html';
  readonly pageTitle = 'frontoffice-student-referral-1';
}
