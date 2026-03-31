import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-login-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/login.html';
  readonly pageTitle = 'frontoffice-login';
}
