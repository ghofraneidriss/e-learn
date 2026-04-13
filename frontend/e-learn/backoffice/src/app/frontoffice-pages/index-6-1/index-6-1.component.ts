import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-index-6-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-6-1.component.html',
  styleUrl: './index-6-1.component.css'
})
export class Index61FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/index-6-1.html';
  readonly pageTitle = 'frontoffice-index-6-1';
}
