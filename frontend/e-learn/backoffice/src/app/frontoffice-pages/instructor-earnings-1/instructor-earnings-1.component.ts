import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-earnings-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-earnings-1.component.html',
  styleUrl: './instructor-earnings-1.component.css'
})
export class InstructorEarnings1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-earnings-1.html';
  readonly pageTitle = 'frontoffice-instructor-earnings-1';
}
