import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-index-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/index.html';
  readonly pageTitle = 'frontoffice-2-index';
}
