import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-order-history-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-order-history.component.html',
  styleUrl: './student-order-history.component.css'
})
export class StudentOrderHistoryFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-order-history.html';
  readonly pageTitle = 'frontoffice-student-order-history';
}
