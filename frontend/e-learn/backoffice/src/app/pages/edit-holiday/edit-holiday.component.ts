import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-edit-holiday-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './edit-holiday.component.html',
  styleUrl: './edit-holiday.component.css'
})
export class EditHolidayPageComponent {
  readonly pagePath = 'xhtml/edit-holiday.html';
  readonly pageTitle = 'edit-holiday';
}
