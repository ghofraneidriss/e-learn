import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-404-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './404.component.html',
  styleUrl: './404.component.css'
})
export class Num404Frontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/404.html';
  readonly pageTitle = 'frontoffice-2-404';
}
