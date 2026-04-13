import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-error-500-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './error-500-1.component.html',
  styleUrl: './error-500-1.component.css'
})
export class Error5001FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/error-500-1.html';
  readonly pageTitle = 'frontoffice-error-500-1';
}
