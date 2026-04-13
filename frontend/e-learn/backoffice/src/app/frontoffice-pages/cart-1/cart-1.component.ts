import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-cart-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './cart-1.component.html',
  styleUrl: './cart-1.component.css'
})
export class Cart1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/cart-1.html';
  readonly pageTitle = 'frontoffice-cart-1';
}
