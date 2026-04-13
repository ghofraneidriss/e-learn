import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-index-one-page-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-one-page.component.html',
  styleUrl: './index-one-page.component.css'
})
export class IndexOnePageFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/index-one-page.html';
  readonly pageTitle = 'frontoffice-2-index-one-page';
}
