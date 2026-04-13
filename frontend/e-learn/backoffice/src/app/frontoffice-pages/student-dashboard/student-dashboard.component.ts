import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-dashboard-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-dashboard.html';
  readonly pageTitle = 'frontoffice-student-dashboard';
}
