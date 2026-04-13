import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-add-departments-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './add-departments.component.html',
  styleUrl: './add-departments.component.css'
})
export class AddDepartmentsPageComponent {
  readonly pagePath = 'xhtml/add-departments.html';
  readonly pageTitle = 'add-departments';
}
