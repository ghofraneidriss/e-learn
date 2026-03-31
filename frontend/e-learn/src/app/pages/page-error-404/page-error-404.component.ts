import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-page-error-404-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './page-error-404.component.html',
  styleUrl: './page-error-404.component.css'
})
export class PageError404PageComponent {
  readonly pagePath = 'xhtml/page-error-404.html';
  readonly pageTitle = 'page-error-404';
}
