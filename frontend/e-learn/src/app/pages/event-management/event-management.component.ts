import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-event-management-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.css'
})
export class EventManagementPageComponent {
  readonly pagePath = 'xhtml/event-management.html';
  readonly pageTitle = 'event-management';
}
