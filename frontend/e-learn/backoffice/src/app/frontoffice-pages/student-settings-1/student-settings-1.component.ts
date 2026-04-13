import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-settings-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-settings-1.component.html',
  styleUrl: './student-settings-1.component.css'
})
export class StudentSettings1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-settings-1.html';
  readonly pageTitle = 'frontoffice-student-settings-1';
}
