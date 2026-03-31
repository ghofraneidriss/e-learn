import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-edit-staff-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './edit-staff.component.html',
  styleUrl: './edit-staff.component.css'
})
export class EditStaffPageComponent {
  readonly pagePath = 'xhtml/edit-staff.html';
  readonly pageTitle = 'edit-staff';
}
