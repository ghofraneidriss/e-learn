import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-all-professors-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './all-professors.component.html',
  styleUrl: './all-professors.component.css'
})
export class AllProfessorsPageComponent {
  readonly pagePath = 'xhtml/all-professors.html';
  readonly pageTitle = 'all-professors';
}
