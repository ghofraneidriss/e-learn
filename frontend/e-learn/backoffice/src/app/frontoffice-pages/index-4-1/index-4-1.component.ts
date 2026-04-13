import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-index-4-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-4-1.component.html',
  styleUrl: './index-4-1.component.css'
})
export class Index41FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/index-4-1.html';
  readonly pageTitle = 'frontoffice-index-4-1';
}
