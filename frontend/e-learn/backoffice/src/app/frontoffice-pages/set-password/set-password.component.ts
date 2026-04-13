import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-set-password-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css'
})
export class SetPasswordFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/set-password.html';
  readonly pageTitle = 'frontoffice-set-password';
}
