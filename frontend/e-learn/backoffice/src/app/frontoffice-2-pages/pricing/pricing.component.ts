import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-pricing-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/pricing.html';
  readonly pageTitle = 'frontoffice-2-pricing';
}
