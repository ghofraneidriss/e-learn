import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-index-6-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-6.component.html',
  styleUrl: './index-6.component.css'
})
export class Index6FrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/index-6.html';
  readonly pageTitle = 'frontoffice-index-6';
}
