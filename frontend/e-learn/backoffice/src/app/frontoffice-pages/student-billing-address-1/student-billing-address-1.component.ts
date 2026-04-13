import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-billing-address-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-billing-address-1.component.html',
  styleUrl: './student-billing-address-1.component.css'
})
export class StudentBillingAddress1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-billing-address-1.html';
  readonly pageTitle = 'frontoffice-student-billing-address-1';
}
