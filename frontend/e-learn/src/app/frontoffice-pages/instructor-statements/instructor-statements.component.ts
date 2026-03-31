import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-statements-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-statements.component.html',
  styleUrl: './instructor-statements.component.css'
})
export class InstructorStatementsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-statements.html';
  readonly pageTitle = 'frontoffice-instructor-statements';
}
