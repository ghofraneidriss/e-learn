import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-page-error-500-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './page-error-500.component.html',
  styleUrl: './page-error-500.component.css'
})
export class PageError500PageComponent {
  readonly pagePath = 'xhtml/page-error-500.html';
  readonly pageTitle = 'page-error-500';
}
