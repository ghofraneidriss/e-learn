import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-faq-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/faq.html';
  readonly pageTitle = 'frontoffice-faq';
}
