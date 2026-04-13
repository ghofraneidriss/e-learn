import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-index-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-1.component.html',
  styleUrl: './index-1.component.css'
})
export class Index1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/index-1.html';
  readonly pageTitle = 'frontoffice-index-1';
}
