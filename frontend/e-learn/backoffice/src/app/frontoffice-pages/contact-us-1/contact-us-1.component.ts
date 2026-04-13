import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-contact-us-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './contact-us-1.component.html',
  styleUrl: './contact-us-1.component.css'
})
export class ContactUs1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/contact-us-1.html';
  readonly pageTitle = 'frontoffice-contact-us-1';
}
