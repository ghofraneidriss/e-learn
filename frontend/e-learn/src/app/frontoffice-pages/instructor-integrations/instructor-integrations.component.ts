import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-integrations-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-integrations.component.html',
  styleUrl: './instructor-integrations.component.css'
})
export class InstructorIntegrationsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-integrations.html';
  readonly pageTitle = 'frontoffice-instructor-integrations';
}
