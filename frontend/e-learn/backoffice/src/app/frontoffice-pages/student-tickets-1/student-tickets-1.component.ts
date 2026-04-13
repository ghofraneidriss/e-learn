import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-tickets-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-tickets-1.component.html',
  styleUrl: './student-tickets-1.component.css'
})
export class StudentTickets1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-tickets-1.html';
  readonly pageTitle = 'frontoffice-student-tickets-1';
}
