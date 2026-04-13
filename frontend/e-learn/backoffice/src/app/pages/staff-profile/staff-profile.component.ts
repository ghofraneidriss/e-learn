import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-staff-profile-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './staff-profile.component.html',
  styleUrl: './staff-profile.component.css'
})
export class StaffProfilePageComponent {
  readonly pagePath = 'xhtml/staff-profile.html';
  readonly pageTitle = 'staff-profile';
}
