import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-pricing-plan-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './pricing-plan-1.component.html',
  styleUrl: './pricing-plan-1.component.css'
})
export class PricingPlan1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/pricing-plan-1.html';
  readonly pageTitle = 'frontoffice-pricing-plan-1';
}
