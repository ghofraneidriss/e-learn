import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-alert-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-alert.component.html',
  styleUrl: './ui-alert.component.css'
})
export class UiAlertPageComponent {
  readonly pagePath = 'xhtml/ui-alert.html';
  readonly pageTitle = 'ui-alert';
}
