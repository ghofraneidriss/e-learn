import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-contact-us-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/contact-us.html';
  readonly pageTitle = 'frontoffice-contact-us';
}
