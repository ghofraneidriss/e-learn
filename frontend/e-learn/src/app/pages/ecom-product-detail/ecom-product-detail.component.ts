import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ecom-product-detail-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ecom-product-detail.component.html',
  styleUrl: './ecom-product-detail.component.css'
})
export class EcomProductDetailPageComponent {
  readonly pagePath = 'xhtml/ecom-product-detail.html';
  readonly pageTitle = 'ecom-product-detail';
}
