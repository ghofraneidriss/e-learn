import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-register-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './register-1.component.html',
  styleUrl: './register-1.component.css'
})
export class Register1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/register-1.html';
  readonly pageTitle = 'frontoffice-register-1';
}
