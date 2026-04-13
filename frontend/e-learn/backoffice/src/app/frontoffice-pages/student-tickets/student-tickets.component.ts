import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-tickets-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-tickets.component.html',
  styleUrl: './student-tickets.component.css'
})
export class StudentTicketsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-tickets.html';
  readonly pageTitle = 'frontoffice-student-tickets';
}
