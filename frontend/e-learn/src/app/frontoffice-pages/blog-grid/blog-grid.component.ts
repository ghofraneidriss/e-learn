import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-grid-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-grid.component.html',
  styleUrl: './blog-grid.component.css'
})
export class BlogGridFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/blog-grid.html';
  readonly pageTitle = 'frontoffice-blog-grid';
}
