import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-page-login-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.css'
})
export class PageLoginPageComponent {
  readonly pagePath = 'xhtml/page-login.html';
  readonly pageTitle = 'page-login';
}
