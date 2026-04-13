import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-tickets-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-tickets.component.html',
  styleUrl: './instructor-tickets.component.css'
})
export class InstructorTicketsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-tickets.html';
  readonly pageTitle = 'frontoffice-instructor-tickets';
}
