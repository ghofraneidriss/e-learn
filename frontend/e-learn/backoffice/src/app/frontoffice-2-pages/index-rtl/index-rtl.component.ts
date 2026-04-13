import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-index-rtl-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-rtl.component.html',
  styleUrl: './index-rtl.component.css'
})
export class IndexRtlFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/index-rtl.html';
  readonly pageTitle = 'frontoffice-2-index-rtl';
}
