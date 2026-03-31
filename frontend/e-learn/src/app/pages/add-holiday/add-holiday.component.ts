import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-add-holiday-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './add-holiday.component.html',
  styleUrl: './add-holiday.component.css'
})
export class AddHolidayPageComponent {
  readonly pagePath = 'xhtml/add-holiday.html';
  readonly pageTitle = 'add-holiday';
}
