import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-edit-student-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentPageComponent {
  readonly pagePath = 'xhtml/edit-student.html';
  readonly pageTitle = 'edit-student';
}
