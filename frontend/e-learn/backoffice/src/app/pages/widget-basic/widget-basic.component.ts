import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-widget-basic-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './widget-basic.component.html',
  styleUrl: './widget-basic.component.css'
})
export class WidgetBasicPageComponent {
  readonly pagePath = 'xhtml/widget-basic.html';
  readonly pageTitle = 'widget-basic';
}
