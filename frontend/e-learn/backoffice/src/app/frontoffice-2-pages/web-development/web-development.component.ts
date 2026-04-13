import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-web-development-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './web-development.component.html',
  styleUrl: './web-development.component.css'
})
export class WebDevelopmentFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/web-development.html';
  readonly pageTitle = 'frontoffice-2-web-development';
}
