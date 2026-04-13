import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-add-library-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './add-library.component.html',
  styleUrl: './add-library.component.css'
})
export class AddLibraryPageComponent {
  readonly pagePath = 'xhtml/add-library.html';
  readonly pageTitle = 'add-library';
}
