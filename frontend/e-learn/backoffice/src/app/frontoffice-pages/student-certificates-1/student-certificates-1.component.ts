import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-certificates-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-certificates-1.component.html',
  styleUrl: './student-certificates-1.component.css'
})
export class StudentCertificates1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-certificates-1.html';
  readonly pageTitle = 'frontoffice-student-certificates-1';
}
