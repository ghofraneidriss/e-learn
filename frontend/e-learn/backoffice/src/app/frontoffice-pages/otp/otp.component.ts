import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-otp-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/otp.html';
  readonly pageTitle = 'frontoffice-otp';
}
