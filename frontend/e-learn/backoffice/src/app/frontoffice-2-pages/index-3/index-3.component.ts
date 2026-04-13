import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-index-3-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-3.component.html',
  styleUrl: './index-3.component.css'
})
export class Index3Frontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/index-3.html';
  readonly pageTitle = 'frontoffice-2-index-3';
}
