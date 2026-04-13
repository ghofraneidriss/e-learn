import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-blog-grid-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-grid.component.html',
  styleUrl: './blog-grid.component.css'
})
export class BlogGridFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/blog-grid.html';
  readonly pageTitle = 'frontoffice-2-blog-grid';
}
