import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-masonry-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-masonry.component.html',
  styleUrl: './blog-masonry.component.css'
})
export class BlogMasonryFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/blog-masonry.html';
  readonly pageTitle = 'frontoffice-blog-masonry';
}
