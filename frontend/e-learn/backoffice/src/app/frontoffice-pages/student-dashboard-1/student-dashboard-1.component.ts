import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-dashboard-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-dashboard-1.component.html',
  styleUrl: './student-dashboard-1.component.css'
})
export class StudentDashboard1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-dashboard-1.html';
  readonly pageTitle = 'frontoffice-student-dashboard-1';
}
