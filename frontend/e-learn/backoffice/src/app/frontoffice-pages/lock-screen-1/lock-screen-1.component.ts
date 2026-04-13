import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-lock-screen-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './lock-screen-1.component.html',
  styleUrl: './lock-screen-1.component.css'
})
export class LockScreen1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/lock-screen-1.html';
  readonly pageTitle = 'frontoffice-lock-screen-1';
}
