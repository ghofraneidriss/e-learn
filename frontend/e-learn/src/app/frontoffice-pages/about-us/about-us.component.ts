import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-about-us-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/about-us.html';
  readonly pageTitle = 'frontoffice-about-us';
}
