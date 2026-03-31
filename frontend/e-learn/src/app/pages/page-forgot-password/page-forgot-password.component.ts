import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-page-forgot-password-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './page-forgot-password.component.html',
  styleUrl: './page-forgot-password.component.css'
})
export class PageForgotPasswordPageComponent {
  readonly pagePath = 'xhtml/page-forgot-password.html';
  readonly pageTitle = 'page-forgot-password';
}
