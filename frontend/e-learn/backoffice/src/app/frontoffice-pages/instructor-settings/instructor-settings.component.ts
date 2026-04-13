import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-settings-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-settings.component.html',
  styleUrl: './instructor-settings.component.css'
})
export class InstructorSettingsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-settings.html';
  readonly pageTitle = 'frontoffice-instructor-settings';
}
