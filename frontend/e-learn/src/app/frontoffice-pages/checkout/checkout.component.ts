import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-checkout-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/checkout.html';
  readonly pageTitle = 'frontoffice-checkout';
}
