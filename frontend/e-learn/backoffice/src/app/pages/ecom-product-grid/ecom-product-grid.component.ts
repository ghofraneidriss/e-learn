import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ecom-product-grid-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ecom-product-grid.component.html',
  styleUrl: './ecom-product-grid.component.css'
})
export class EcomProductGridPageComponent {
  readonly pagePath = 'xhtml/ecom-product-grid.html';
  readonly pageTitle = 'ecom-product-grid';
}
