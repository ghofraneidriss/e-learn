import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-integrations-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-integrations-1.component.html',
  styleUrl: './instructor-integrations-1.component.css'
})
export class InstructorIntegrations1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-integrations-1.html';
  readonly pageTitle = 'frontoffice-instructor-integrations-1';
}
