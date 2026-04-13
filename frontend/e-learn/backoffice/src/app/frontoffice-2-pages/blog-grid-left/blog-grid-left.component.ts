import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-blog-grid-left-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-grid-left.component.html',
  styleUrl: './blog-grid-left.component.css'
})
export class BlogGridLeftFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/blog-grid-left.html';
  readonly pageTitle = 'frontoffice-2-blog-grid-left';
}
