import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-billing-address-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-billing-address.component.html',
  styleUrl: './student-billing-address.component.css'
})
export class StudentBillingAddressFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-billing-address.html';
  readonly pageTitle = 'frontoffice-student-billing-address';
}
