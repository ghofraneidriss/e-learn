import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-add-staff-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.css'
})
export class AddStaffPageComponent {
  readonly pagePath = 'xhtml/add-staff.html';
  readonly pageTitle = 'add-staff';
}
