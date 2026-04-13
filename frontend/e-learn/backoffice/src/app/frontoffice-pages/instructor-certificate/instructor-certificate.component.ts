import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-certificate-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-certificate.component.html',
  styleUrl: './instructor-certificate.component.css'
})
export class InstructorCertificateFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-certificate.html';
  readonly pageTitle = 'frontoffice-instructor-certificate';
}
