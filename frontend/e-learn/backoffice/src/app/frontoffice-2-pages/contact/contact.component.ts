import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-contact-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/contact.html';
  readonly pageTitle = 'frontoffice-2-contact';
}
