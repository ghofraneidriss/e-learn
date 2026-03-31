import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-pricing-plan-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './pricing-plan.component.html',
  styleUrl: './pricing-plan.component.css'
})
export class PricingPlanFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/pricing-plan.html';
  readonly pageTitle = 'frontoffice-pricing-plan';
}
