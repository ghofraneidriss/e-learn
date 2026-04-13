import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-register-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/register.html';
  readonly pageTitle = 'frontoffice-register';
}
