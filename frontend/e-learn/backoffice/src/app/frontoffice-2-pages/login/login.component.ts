import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-login-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/login.html';
  readonly pageTitle = 'frontoffice-2-login';
}
