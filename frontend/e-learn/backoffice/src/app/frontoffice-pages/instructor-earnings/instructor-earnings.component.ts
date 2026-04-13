import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-earnings-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-earnings.component.html',
  styleUrl: './instructor-earnings.component.css'
})
export class InstructorEarningsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/instructor-earnings.html';
  readonly pageTitle = 'frontoffice-instructor-earnings';
}
