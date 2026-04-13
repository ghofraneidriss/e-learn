import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-assignment-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-assignment-1.component.html',
  styleUrl: './instructor-assignment-1.component.css'
})
export class InstructorAssignment1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-assignment-1.html';
  readonly pageTitle = 'frontoffice-instructor-assignment-1';
}
