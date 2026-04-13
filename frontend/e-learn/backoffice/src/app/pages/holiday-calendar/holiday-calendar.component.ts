import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-holiday-calendar-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './holiday-calendar.component.html',
  styleUrl: './holiday-calendar.component.css'
})
export class HolidayCalendarPageComponent {
  readonly pagePath = 'xhtml/holiday-calendar.html';
  readonly pageTitle = 'holiday-calendar';
}
