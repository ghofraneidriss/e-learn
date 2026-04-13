import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-error-404-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './error-404-1.component.html',
  styleUrl: './error-404-1.component.css'
})
export class Error4041FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/error-404-1.html';
  readonly pageTitle = 'frontoffice-error-404-1';
}
