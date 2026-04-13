import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-privacy-policy-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/privacy-policy.html';
  readonly pageTitle = 'frontoffice-privacy-policy';
}
