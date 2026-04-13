import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-privacy-policy-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './privacy-policy-1.component.html',
  styleUrl: './privacy-policy-1.component.css'
})
export class PrivacyPolicy1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/privacy-policy-1.html';
  readonly pageTitle = 'frontoffice-privacy-policy-1';
}
