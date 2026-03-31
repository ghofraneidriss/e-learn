import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ecom-product-list-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ecom-product-list.component.html',
  styleUrl: './ecom-product-list.component.css'
})
export class EcomProductListPageComponent {
  readonly pagePath = 'xhtml/ecom-product-list.html';
  readonly pageTitle = 'ecom-product-list';
}
