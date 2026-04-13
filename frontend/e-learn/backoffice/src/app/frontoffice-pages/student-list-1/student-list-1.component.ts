import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-list-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-list-1.component.html',
  styleUrl: './student-list-1.component.css'
})
export class StudentList1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-list-1.html';
  readonly pageTitle = 'frontoffice-student-list-1';
}
