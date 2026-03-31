import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-index-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/index.html';
  readonly pageTitle = 'frontoffice-index';
}
