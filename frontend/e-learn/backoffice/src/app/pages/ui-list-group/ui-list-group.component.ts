import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-list-group-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-list-group.component.html',
  styleUrl: './ui-list-group.component.css'
})
export class UiListGroupPageComponent {
  readonly pagePath = 'xhtml/ui-list-group.html';
  readonly pageTitle = 'ui-list-group';
}
