import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-certificates-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-certificates.component.html',
  styleUrl: './student-certificates.component.css'
})
export class StudentCertificatesFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-certificates.html';
  readonly pageTitle = 'frontoffice-student-certificates';
}
