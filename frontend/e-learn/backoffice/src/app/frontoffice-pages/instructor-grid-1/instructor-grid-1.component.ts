import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-grid-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-grid-1.component.html',
  styleUrl: './instructor-grid-1.component.css'
})
export class InstructorGrid1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-grid-1.html';
  readonly pageTitle = 'frontoffice-instructor-grid-1';
}
