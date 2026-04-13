import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-all-students-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.css'
})
export class AllStudentsPageComponent {
  readonly pagePath = 'xhtml/all-students.html';
  readonly pageTitle = 'all-students';
}
