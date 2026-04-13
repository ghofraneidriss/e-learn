import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-progressbar-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-progressbar.component.html',
  styleUrl: './ui-progressbar.component.css'
})
export class UiProgressbarPageComponent {
  readonly pagePath = 'xhtml/ui-progressbar.html';
  readonly pageTitle = 'ui-progressbar';
}
