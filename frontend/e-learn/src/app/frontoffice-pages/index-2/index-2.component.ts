import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-index-2-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-2.component.html',
  styleUrl: './index-2.component.css'
})
export class Index2FrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/index-2.html';
  readonly pageTitle = 'frontoffice-index-2';
}
