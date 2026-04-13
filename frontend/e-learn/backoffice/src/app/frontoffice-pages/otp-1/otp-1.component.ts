import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-otp-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './otp-1.component.html',
  styleUrl: './otp-1.component.css'
})
export class Otp1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/otp-1.html';
  readonly pageTitle = 'frontoffice-otp-1';
}
