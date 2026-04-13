import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-index-boxed-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-boxed.component.html',
  styleUrl: './index-boxed.component.css'
})
export class IndexBoxedFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/index-boxed.html';
  readonly pageTitle = 'frontoffice-2-index-boxed';
}
