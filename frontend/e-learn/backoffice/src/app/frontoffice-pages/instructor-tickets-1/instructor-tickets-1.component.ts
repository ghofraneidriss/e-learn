import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-tickets-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-tickets-1.component.html',
  styleUrl: './instructor-tickets-1.component.css'
})
export class InstructorTickets1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-tickets-1.html';
  readonly pageTitle = 'frontoffice-instructor-tickets-1';
}
