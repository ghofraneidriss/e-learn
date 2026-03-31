import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-all-library-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './all-library.component.html',
  styleUrl: './all-library.component.css'
})
export class AllLibraryPageComponent {
  readonly pagePath = 'xhtml/all-library.html';
  readonly pageTitle = 'all-library';
}
