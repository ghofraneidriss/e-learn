import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-all-departments-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './all-departments.component.html',
  styleUrl: './all-departments.component.css'
})
export class AllDepartmentsPageComponent {
  readonly pagePath = 'xhtml/all-departments.html';
  readonly pageTitle = 'all-departments';
}
