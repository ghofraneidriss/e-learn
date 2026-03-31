import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-students-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/students.html';
  readonly pageTitle = 'frontoffice-students';
}
