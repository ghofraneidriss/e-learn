import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-media-object-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-media-object.component.html',
  styleUrl: './ui-media-object.component.css'
})
export class UiMediaObjectPageComponent {
  readonly pagePath = 'xhtml/ui-media-object.html';
  readonly pageTitle = 'ui-media-object';
}
