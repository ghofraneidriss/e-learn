import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-cart-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/cart.html';
  readonly pageTitle = 'frontoffice-2-cart';
}
