import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-cart-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/cart.html';
  readonly pageTitle = 'frontoffice-cart';
}
