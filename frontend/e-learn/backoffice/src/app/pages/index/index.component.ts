import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-index-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexPageComponent {
  readonly pagePath = 'xhtml/index.html';
  readonly pageTitle = 'index';
}
