import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-frontend-development-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './frontend-development.component.html',
  styleUrl: './frontend-development.component.css'
})
export class FrontendDevelopmentFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/frontend-development.html';
  readonly pageTitle = 'frontoffice-2-frontend-development';
}
