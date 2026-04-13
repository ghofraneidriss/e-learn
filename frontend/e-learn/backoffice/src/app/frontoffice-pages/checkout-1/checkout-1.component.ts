import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-checkout-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './checkout-1.component.html',
  styleUrl: './checkout-1.component.css'
})
export class Checkout1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/checkout-1.html';
  readonly pageTitle = 'frontoffice-checkout-1';
}
