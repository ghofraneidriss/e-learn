import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-payout-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-payout-1.component.html',
  styleUrl: './instructor-payout-1.component.css'
})
export class InstructorPayout1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-payout-1.html';
  readonly pageTitle = 'frontoffice-instructor-payout-1';
}
