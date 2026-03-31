import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-badge-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-badge.component.html',
  styleUrl: './ui-badge.component.css'
})
export class UiBadgePageComponent {
  readonly pagePath = 'xhtml/ui-badge.html';
  readonly pageTitle = 'ui-badge';
}
