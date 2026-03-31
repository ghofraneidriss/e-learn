import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-add-student-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentPageComponent {
  readonly pagePath = 'xhtml/add-student.html';
  readonly pageTitle = 'add-student';
}
