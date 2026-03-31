import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-reset-password-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/reset-password.html';
  readonly pageTitle = 'frontoffice-reset-password';
}
