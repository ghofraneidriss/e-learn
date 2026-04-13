import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-list-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-list-1.component.html',
  styleUrl: './instructor-list-1.component.css'
})
export class InstructorList1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-list-1.html';
  readonly pageTitle = 'frontoffice-instructor-list-1';
}
