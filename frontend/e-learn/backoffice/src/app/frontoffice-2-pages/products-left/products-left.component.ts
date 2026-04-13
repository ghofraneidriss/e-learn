import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-products-left-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './products-left.component.html',
  styleUrl: './products-left.component.css'
})
export class ProductsLeftFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/products-left.html';
  readonly pageTitle = 'frontoffice-2-products-left';
}
