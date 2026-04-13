import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-all-staff-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './all-staff.component.html',
  styleUrl: './all-staff.component.css'
})
export class AllStaffPageComponent {
  readonly pagePath = 'xhtml/all-staff.html';
  readonly pageTitle = 'all-staff';
}
