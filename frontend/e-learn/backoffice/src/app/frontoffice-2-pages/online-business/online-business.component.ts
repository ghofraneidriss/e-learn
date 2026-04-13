import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-online-business-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './online-business.component.html',
  styleUrl: './online-business.component.css'
})
export class OnlineBusinessFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/online-business.html';
  readonly pageTitle = 'frontoffice-2-online-business';
}
