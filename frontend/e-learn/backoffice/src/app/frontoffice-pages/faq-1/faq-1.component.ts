import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-faq-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './faq-1.component.html',
  styleUrl: './faq-1.component.css'
})
export class Faq1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/faq-1.html';
  readonly pageTitle = 'frontoffice-faq-1';
}
