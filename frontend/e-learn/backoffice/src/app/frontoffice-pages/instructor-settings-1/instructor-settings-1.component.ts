import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-settings-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-settings-1.component.html',
  styleUrl: './instructor-settings-1.component.css'
})
export class InstructorSettings1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-settings-1.html';
  readonly pageTitle = 'frontoffice-instructor-settings-1';
}
