import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-edit-professor-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './edit-professor.component.html',
  styleUrl: './edit-professor.component.css'
})
export class EditProfessorPageComponent {
  readonly pagePath = 'xhtml/edit-professor.html';
  readonly pageTitle = 'edit-professor';
}
