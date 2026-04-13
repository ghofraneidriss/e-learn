import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-statements-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-statements-1.component.html',
  styleUrl: './instructor-statements-1.component.css'
})
export class InstructorStatements1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-statements-1.html';
  readonly pageTitle = 'frontoffice-instructor-statements-1';
}
