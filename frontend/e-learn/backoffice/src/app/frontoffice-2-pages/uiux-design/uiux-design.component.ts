import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-uiux-design-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './uiux-design.component.html',
  styleUrl: './uiux-design.component.css'
})
export class UiuxDesignFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/uiux-design.html';
  readonly pageTitle = 'frontoffice-2-uiux-design';
}
