import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-accordion-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-accordion.component.html',
  styleUrl: './ui-accordion.component.css'
})
export class UiAccordionPageComponent {
  readonly pagePath = 'xhtml/ui-accordion.html';
  readonly pageTitle = 'ui-accordion';
}
