import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-grid-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-grid.component.html',
  styleUrl: './instructor-grid.component.css'
})
export class InstructorGridFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-grid.html';
  readonly pageTitle = 'frontoffice-instructor-grid';
}
