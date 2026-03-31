import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-error-404-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './error-404.component.html',
  styleUrl: './error-404.component.css'
})
export class Error404FrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/error-404.html';
  readonly pageTitle = 'frontoffice-error-404';
}
