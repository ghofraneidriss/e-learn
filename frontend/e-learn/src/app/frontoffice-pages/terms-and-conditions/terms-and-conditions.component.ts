import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-terms-and-conditions-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.css'
})
export class TermsAndConditionsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/terms-and-conditions.html';
  readonly pageTitle = 'frontoffice-terms-and-conditions';
}
