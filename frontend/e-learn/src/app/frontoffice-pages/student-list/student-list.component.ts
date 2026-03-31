import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-list-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-list.html';
  readonly pageTitle = 'frontoffice-student-list';
}
