import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-index-3-one-page-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-3-one-page.component.html',
  styleUrl: './index-3-one-page.component.css'
})
export class Index3OnePageFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/index-3-one-page.html';
  readonly pageTitle = 'frontoffice-2-index-3-one-page';
}
