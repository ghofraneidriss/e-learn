import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-page-register-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './page-register.component.html',
  styleUrl: './page-register.component.css'
})
export class PageRegisterPageComponent {
  readonly pagePath = 'xhtml/page-register.html';
  readonly pageTitle = 'page-register';
}
