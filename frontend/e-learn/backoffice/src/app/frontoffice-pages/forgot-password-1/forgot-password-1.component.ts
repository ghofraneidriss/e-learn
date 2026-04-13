import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-forgot-password-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './forgot-password-1.component.html',
  styleUrl: './forgot-password-1.component.css'
})
export class ForgotPassword1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/forgot-password-1.html';
  readonly pageTitle = 'frontoffice-forgot-password-1';
}
