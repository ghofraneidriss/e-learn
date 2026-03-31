import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-assignment-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-assignment.component.html',
  styleUrl: './instructor-assignment.component.css'
})
export class InstructorAssignmentFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-assignment.html';
  readonly pageTitle = 'frontoffice-instructor-assignment';
}
