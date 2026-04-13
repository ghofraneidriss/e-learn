import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-index-dark-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-dark.component.html',
  styleUrl: './index-dark.component.css'
})
export class IndexDarkFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/index-dark.html';
  readonly pageTitle = 'frontoffice-2-index-dark';
}
