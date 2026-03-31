import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-edit-library-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './edit-library.component.html',
  styleUrl: './edit-library.component.css'
})
export class EditLibraryPageComponent {
  readonly pagePath = 'xhtml/edit-library.html';
  readonly pageTitle = 'edit-library';
}
