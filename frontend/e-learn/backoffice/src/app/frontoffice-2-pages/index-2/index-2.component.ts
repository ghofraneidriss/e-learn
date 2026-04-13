import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-index-2-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-2.component.html',
  styleUrl: './index-2.component.css'
})
export class Index2Frontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/index-2.html';
  readonly pageTitle = 'frontoffice-2-index-2';
}
