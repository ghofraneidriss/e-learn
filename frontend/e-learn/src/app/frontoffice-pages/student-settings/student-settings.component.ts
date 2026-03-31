import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-settings-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-settings.component.html',
  styleUrl: './student-settings.component.css'
})
export class StudentSettingsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-settings.html';
  readonly pageTitle = 'frontoffice-student-settings';
}
