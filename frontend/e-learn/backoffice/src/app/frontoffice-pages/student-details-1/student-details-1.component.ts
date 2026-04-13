import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-details-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-details-1.component.html',
  styleUrl: './student-details-1.component.css'
})
export class StudentDetails1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-details-1.html';
  readonly pageTitle = 'frontoffice-student-details-1';
}
