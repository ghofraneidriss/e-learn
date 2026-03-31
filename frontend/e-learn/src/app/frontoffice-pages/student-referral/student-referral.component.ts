import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-referral-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-referral.component.html',
  styleUrl: './student-referral.component.css'
})
export class StudentReferralFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-referral.html';
  readonly pageTitle = 'frontoffice-student-referral';
}
