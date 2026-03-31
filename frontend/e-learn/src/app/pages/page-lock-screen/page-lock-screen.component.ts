import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-page-lock-screen-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './page-lock-screen.component.html',
  styleUrl: './page-lock-screen.component.css'
})
export class PageLockScreenPageComponent {
  readonly pagePath = 'xhtml/page-lock-screen.html';
  readonly pageTitle = 'page-lock-screen';
}
