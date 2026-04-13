import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-reset-password-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './reset-password-1.component.html',
  styleUrl: './reset-password-1.component.css'
})
export class ResetPassword1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/reset-password-1.html';
  readonly pageTitle = 'frontoffice-reset-password-1';
}
