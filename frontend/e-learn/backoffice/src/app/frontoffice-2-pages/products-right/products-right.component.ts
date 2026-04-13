import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-products-right-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './products-right.component.html',
  styleUrl: './products-right.component.css'
})
export class ProductsRightFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/products-right.html';
  readonly pageTitle = 'frontoffice-2-products-right';
}
