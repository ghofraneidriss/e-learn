import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-index-5-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-5-1.component.html',
  styleUrl: './index-5-1.component.css'
})
export class Index51FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/index-5-1.html';
  readonly pageTitle = 'frontoffice-index-5-1';
}
