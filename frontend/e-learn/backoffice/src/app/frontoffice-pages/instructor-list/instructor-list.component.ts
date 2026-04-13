import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-list-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-list.component.html',
  styleUrl: './instructor-list.component.css'
})
export class InstructorListFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-list.html';
  readonly pageTitle = 'frontoffice-instructor-list';
}
