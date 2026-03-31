import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-page-error-400-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './page-error-400.component.html',
  styleUrl: './page-error-400.component.css'
})
export class PageError400PageComponent {
  readonly pagePath = 'xhtml/page-error-400.html';
  readonly pageTitle = 'page-error-400';
}
