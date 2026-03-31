import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-forgot-password-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/forgot-password.html';
  readonly pageTitle = 'frontoffice-forgot-password';
}
