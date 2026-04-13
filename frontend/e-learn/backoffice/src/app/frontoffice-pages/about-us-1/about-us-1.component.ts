import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-about-us-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './about-us-1.component.html',
  styleUrl: './about-us-1.component.css'
})
export class AboutUs1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/about-us-1.html';
  readonly pageTitle = 'frontoffice-about-us-1';
}
