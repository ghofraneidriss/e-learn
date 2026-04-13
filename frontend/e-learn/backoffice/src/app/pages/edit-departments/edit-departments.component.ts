import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-edit-departments-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './edit-departments.component.html',
  styleUrl: './edit-departments.component.css'
})
export class EditDepartmentsPageComponent {
  readonly pagePath = 'xhtml/edit-departments.html';
  readonly pageTitle = 'edit-departments';
}
