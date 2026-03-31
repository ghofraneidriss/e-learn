import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-3-grid-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-3-grid.component.html',
  styleUrl: './blog-3-grid.component.css'
})
export class Blog3GridFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/blog-3-grid.html';
  readonly pageTitle = 'frontoffice-blog-3-grid';
}
