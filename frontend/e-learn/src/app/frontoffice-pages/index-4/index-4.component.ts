import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-index-4-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-4.component.html',
  styleUrl: './index-4.component.css'
})
export class Index4FrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/index-4.html';
  readonly pageTitle = 'frontoffice-index-4';
}
