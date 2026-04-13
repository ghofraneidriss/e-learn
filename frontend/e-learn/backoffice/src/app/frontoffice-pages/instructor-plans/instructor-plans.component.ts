import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-plans-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-plans.component.html',
  styleUrl: './instructor-plans.component.css'
})
export class InstructorPlansFrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-plans.html';
  readonly pageTitle = 'frontoffice-instructor-plans';
}
