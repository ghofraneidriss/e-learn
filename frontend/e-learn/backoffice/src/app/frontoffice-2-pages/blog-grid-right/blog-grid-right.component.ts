import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-blog-grid-right-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-grid-right.component.html',
  styleUrl: './blog-grid-right.component.css'
})
export class BlogGridRightFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/blog-grid-right.html';
  readonly pageTitle = 'frontoffice-2-blog-grid-right';
}
