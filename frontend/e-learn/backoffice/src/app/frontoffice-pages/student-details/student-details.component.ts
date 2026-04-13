import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-details-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-details.html';
  readonly pageTitle = 'frontoffice-student-details';
}
