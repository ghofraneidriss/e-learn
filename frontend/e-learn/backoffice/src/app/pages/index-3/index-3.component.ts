import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-index-3-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-3.component.html',
  styleUrl: './index-3.component.css'
})
export class Index3PageComponent {
  readonly pagePath = 'xhtml/index-3.html';
  readonly pageTitle = 'index-3';
}
