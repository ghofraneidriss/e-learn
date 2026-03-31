import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-table-bootstrap-basic-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './table-bootstrap-basic.component.html',
  styleUrl: './table-bootstrap-basic.component.css'
})
export class TableBootstrapBasicPageComponent {
  readonly pagePath = 'xhtml/table-bootstrap-basic.html';
  readonly pageTitle = 'table-bootstrap-basic';
}
