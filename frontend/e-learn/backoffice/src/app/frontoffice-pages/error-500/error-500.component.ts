import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-error-500-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './error-500.component.html',
  styleUrl: './error-500.component.css'
})
export class Error500FrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/error-500.html';
  readonly pageTitle = 'frontoffice-error-500';
}
