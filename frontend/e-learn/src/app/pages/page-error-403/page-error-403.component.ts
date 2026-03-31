import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-page-error-403-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './page-error-403.component.html',
  styleUrl: './page-error-403.component.css'
})
export class PageError403PageComponent {
  readonly pagePath = 'xhtml/page-error-403.html';
  readonly pageTitle = 'page-error-403';
}
