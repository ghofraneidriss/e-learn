import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-become-an-instructor-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './become-an-instructor-1.component.html',
  styleUrl: './become-an-instructor-1.component.css'
})
export class BecomeAnInstructor1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/become-an-instructor-1.html';
  readonly pageTitle = 'frontoffice-become-an-instructor-1';
}
