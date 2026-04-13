import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-products-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/products.html';
  readonly pageTitle = 'frontoffice-2-products';
}
