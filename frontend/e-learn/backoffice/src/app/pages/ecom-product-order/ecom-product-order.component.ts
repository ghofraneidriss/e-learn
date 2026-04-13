import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ecom-product-order-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ecom-product-order.component.html',
  styleUrl: './ecom-product-order.component.css'
})
export class EcomProductOrderPageComponent {
  readonly pagePath = 'xhtml/ecom-product-order.html';
  readonly pageTitle = 'ecom-product-order';
}
