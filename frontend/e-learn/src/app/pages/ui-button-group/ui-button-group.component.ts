import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-button-group-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-button-group.component.html',
  styleUrl: './ui-button-group.component.css'
})
export class UiButtonGroupPageComponent {
  readonly pagePath = 'xhtml/ui-button-group.html';
  readonly pageTitle = 'ui-button-group';
}
