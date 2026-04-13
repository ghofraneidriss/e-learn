import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ecom-invoice-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ecom-invoice.component.html',
  styleUrl: './ecom-invoice.component.css'
})
export class EcomInvoicePageComponent {
  readonly pagePath = 'xhtml/ecom-invoice.html';
  readonly pageTitle = 'ecom-invoice';
}
