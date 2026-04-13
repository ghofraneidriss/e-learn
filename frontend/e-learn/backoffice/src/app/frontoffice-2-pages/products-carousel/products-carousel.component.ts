import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-products-carousel-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './products-carousel.component.html',
  styleUrl: './products-carousel.component.css'
})
export class ProductsCarouselFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/products-carousel.html';
  readonly pageTitle = 'frontoffice-2-products-carousel';
}
