import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-about-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/about.html';
  readonly pageTitle = 'frontoffice-2-about';
}
