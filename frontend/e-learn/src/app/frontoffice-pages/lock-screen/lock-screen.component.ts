import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-lock-screen-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './lock-screen.component.html',
  styleUrl: './lock-screen.component.css'
})
export class LockScreenFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/lock-screen.html';
  readonly pageTitle = 'frontoffice-lock-screen';
}
