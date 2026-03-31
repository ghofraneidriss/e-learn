import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-index-2-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './index-2.component.html',
  styleUrl: './index-2.component.css'
})
export class Index2PageComponent {
  readonly pagePath = 'xhtml/index-2.html';
  readonly pageTitle = 'index-2';
}
