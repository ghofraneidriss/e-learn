import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-page-error-503-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './page-error-503.component.html',
  styleUrl: './page-error-503.component.css'
})
export class PageError503PageComponent {
  readonly pagePath = 'xhtml/page-error-503.html';
  readonly pageTitle = 'page-error-503';
}
