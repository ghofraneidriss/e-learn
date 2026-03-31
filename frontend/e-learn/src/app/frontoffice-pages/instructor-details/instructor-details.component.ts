import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-details-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-details.component.html',
  styleUrl: './instructor-details.component.css'
})
export class InstructorDetailsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-details.html';
  readonly pageTitle = 'frontoffice-instructor-details';
}
