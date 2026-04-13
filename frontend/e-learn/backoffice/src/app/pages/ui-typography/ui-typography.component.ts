import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-typography-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-typography.component.html',
  styleUrl: './ui-typography.component.css'
})
export class UiTypographyPageComponent {
  readonly pagePath = 'xhtml/ui-typography.html';
  readonly pageTitle = 'ui-typography';
}
