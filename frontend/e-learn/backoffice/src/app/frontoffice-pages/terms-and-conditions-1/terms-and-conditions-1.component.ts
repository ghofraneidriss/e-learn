import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-terms-and-conditions-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './terms-and-conditions-1.component.html',
  styleUrl: './terms-and-conditions-1.component.css'
})
export class TermsAndConditions1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/terms-and-conditions-1.html';
  readonly pageTitle = 'frontoffice-terms-and-conditions-1';
}
