import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-checkout-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/checkout.html';
  readonly pageTitle = 'frontoffice-2-checkout';
}
