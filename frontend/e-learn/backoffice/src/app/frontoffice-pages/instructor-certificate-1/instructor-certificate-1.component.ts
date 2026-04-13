import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-certificate-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-certificate-1.component.html',
  styleUrl: './instructor-certificate-1.component.css'
})
export class InstructorCertificate1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-certificate-1.html';
  readonly pageTitle = 'frontoffice-instructor-certificate-1';
}
