import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-about-student-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './about-student.component.html',
  styleUrl: './about-student.component.css'
})
export class AboutStudentPageComponent {
  readonly pagePath = 'xhtml/about-student.html';
  readonly pageTitle = 'about-student';
}
