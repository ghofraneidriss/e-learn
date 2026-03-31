import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ecom-customers-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ecom-customers.component.html',
  styleUrl: './ecom-customers.component.css'
})
export class EcomCustomersPageComponent {
  readonly pagePath = 'xhtml/ecom-customers.html';
  readonly pageTitle = 'ecom-customers';
}
