import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-payout-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-payout.component.html',
  styleUrl: './instructor-payout.component.css'
})
export class InstructorPayoutFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-payout.html';
  readonly pageTitle = 'frontoffice-instructor-payout';
}
