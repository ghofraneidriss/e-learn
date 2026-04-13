import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-become-an-instructor-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './become-an-instructor.component.html',
  styleUrl: './become-an-instructor.component.css'
})
export class BecomeAnInstructorFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/become-an-instructor.html';
  readonly pageTitle = 'frontoffice-become-an-instructor';
}
