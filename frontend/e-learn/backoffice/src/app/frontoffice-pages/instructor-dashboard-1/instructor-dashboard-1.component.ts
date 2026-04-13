import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-dashboard-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-dashboard-1.component.html',
  styleUrl: './instructor-dashboard-1.component.css'
})
export class InstructorDashboard1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-dashboard-1.html';
  readonly pageTitle = 'frontoffice-instructor-dashboard-1';
}
