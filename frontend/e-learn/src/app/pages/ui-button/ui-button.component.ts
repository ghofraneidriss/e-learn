import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-button-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.css'
})
export class UiButtonPageComponent {
  readonly pagePath = 'xhtml/ui-button.html';
  readonly pageTitle = 'ui-button';
}
