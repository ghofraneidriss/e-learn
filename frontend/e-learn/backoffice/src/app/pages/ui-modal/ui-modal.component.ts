import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-modal-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-modal.component.html',
  styleUrl: './ui-modal.component.css'
})
export class UiModalPageComponent {
  readonly pagePath = 'xhtml/ui-modal.html';
  readonly pageTitle = 'ui-modal';
}
