import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-table-datatable-basic-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './table-datatable-basic.component.html',
  styleUrl: './table-datatable-basic.component.css'
})
export class TableDatatableBasicPageComponent {
  readonly pagePath = 'xhtml/table-datatable-basic.html';
  readonly pageTitle = 'table-datatable-basic';
}
