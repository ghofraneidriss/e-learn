import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-order-history-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-order-history-1.component.html',
  styleUrl: './student-order-history-1.component.css'
})
export class StudentOrderHistory1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-order-history-1.html';
  readonly pageTitle = 'frontoffice-student-order-history-1';
}
