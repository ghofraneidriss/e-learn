import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-set-password-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './set-password-1.component.html',
  styleUrl: './set-password-1.component.css'
})
export class SetPassword1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/set-password-1.html';
  readonly pageTitle = 'frontoffice-set-password-1';
}
