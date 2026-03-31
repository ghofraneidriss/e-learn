import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-grid-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-grid.component.html',
  styleUrl: './ui-grid.component.css'
})
export class UiGridPageComponent {
  readonly pagePath = 'xhtml/ui-grid.html';
  readonly pageTitle = 'ui-grid';
}
