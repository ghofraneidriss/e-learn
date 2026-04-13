import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-card-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-card.component.html',
  styleUrl: './ui-card.component.css'
})
export class UiCardPageComponent {
  readonly pagePath = 'xhtml/ui-card.html';
  readonly pageTitle = 'ui-card';
}
