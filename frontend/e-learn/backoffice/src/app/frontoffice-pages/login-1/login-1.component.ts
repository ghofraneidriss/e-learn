import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-login-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './login-1.component.html',
  styleUrl: './login-1.component.css'
})
export class Login1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/login-1.html';
  readonly pageTitle = 'frontoffice-login-1';
}
