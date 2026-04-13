import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-tab-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-tab.component.html',
  styleUrl: './ui-tab.component.css'
})
export class UiTabPageComponent {
  readonly pagePath = 'xhtml/ui-tab.html';
  readonly pageTitle = 'ui-tab';
}
