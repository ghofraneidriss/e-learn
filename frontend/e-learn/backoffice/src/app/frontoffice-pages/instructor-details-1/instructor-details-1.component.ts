import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-details-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-details-1.component.html',
  styleUrl: './instructor-details-1.component.css'
})
export class InstructorDetails1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-details-1.html';
  readonly pageTitle = 'frontoffice-instructor-details-1';
}
