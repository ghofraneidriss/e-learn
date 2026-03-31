import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-dashboard-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-dashboard.html';
  readonly pageTitle = 'frontoffice-instructor-dashboard';
}
