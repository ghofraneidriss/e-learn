import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-pagination-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-pagination.component.html',
  styleUrl: './ui-pagination.component.css'
})
export class UiPaginationPageComponent {
  readonly pagePath = 'xhtml/ui-pagination.html';
  readonly pageTitle = 'ui-pagination';
}
