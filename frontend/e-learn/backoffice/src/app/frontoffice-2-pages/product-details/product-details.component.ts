import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-product-details-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/product-details.html';
  readonly pageTitle = 'frontoffice-2-product-details';
}
