import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ecom-checkout-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ecom-checkout.component.html',
  styleUrl: './ecom-checkout.component.css'
})
export class EcomCheckoutPageComponent {
  readonly pagePath = 'xhtml/ecom-checkout.html';
  readonly pageTitle = 'ecom-checkout';
}
