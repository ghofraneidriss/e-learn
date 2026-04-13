import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-fees-receipt-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './fees-receipt.component.html',
  styleUrl: './fees-receipt.component.css'
})
export class FeesReceiptPageComponent {
  readonly pagePath = 'xhtml/fees-receipt.html';
  readonly pageTitle = 'fees-receipt';
}
