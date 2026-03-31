import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-all-holiday-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './all-holiday.component.html',
  styleUrl: './all-holiday.component.css'
})
export class AllHolidayPageComponent {
  readonly pagePath = 'xhtml/all-holiday.html';
  readonly pageTitle = 'all-holiday';
}
