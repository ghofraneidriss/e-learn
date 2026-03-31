import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-index-5-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-5.component.html',
  styleUrl: './index-5.component.css'
})
export class Index5FrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/index-5.html';
  readonly pageTitle = 'frontoffice-index-5';
}
