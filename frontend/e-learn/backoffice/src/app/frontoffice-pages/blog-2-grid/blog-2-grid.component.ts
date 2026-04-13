import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-2-grid-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-2-grid.component.html',
  styleUrl: './blog-2-grid.component.css'
})
export class Blog2GridFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/blog-2-grid.html';
  readonly pageTitle = 'frontoffice-blog-2-grid';
}
