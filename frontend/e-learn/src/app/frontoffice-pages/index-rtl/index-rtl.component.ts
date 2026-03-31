import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-index-rtl-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-rtl.component.html',
  styleUrl: './index-rtl.component.css'
})
export class IndexRtlFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/index-rtl.html';
  readonly pageTitle = 'frontoffice-index-rtl';
}
