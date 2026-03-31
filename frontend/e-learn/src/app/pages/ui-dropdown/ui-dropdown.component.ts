import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-dropdown-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-dropdown.component.html',
  styleUrl: './ui-dropdown.component.css'
})
export class UiDropdownPageComponent {
  readonly pagePath = 'xhtml/ui-dropdown.html';
  readonly pageTitle = 'ui-dropdown';
}
