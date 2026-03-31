import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-popover-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-popover.component.html',
  styleUrl: './ui-popover.component.css'
})
export class UiPopoverPageComponent {
  readonly pagePath = 'xhtml/ui-popover.html';
  readonly pageTitle = 'ui-popover';
}
