import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-add-professor-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './add-professor.component.html',
  styleUrl: './add-professor.component.css'
})
export class AddProfessorPageComponent {
  readonly pagePath = 'xhtml/add-professor.html';
  readonly pageTitle = 'add-professor';
}
