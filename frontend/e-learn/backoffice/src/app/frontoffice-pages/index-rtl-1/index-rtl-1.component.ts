import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-index-rtl-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-rtl-1.component.html',
  styleUrl: './index-rtl-1.component.css'
})
export class IndexRtl1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/index-rtl-1.html';
  readonly pageTitle = 'frontoffice-index-rtl-1';
}
