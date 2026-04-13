import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-faq-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/faq.html';
  readonly pageTitle = 'frontoffice-2-faq';
}
