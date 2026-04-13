import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-masonry-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-masonry-1.component.html',
  styleUrl: './blog-masonry-1.component.css'
})
export class BlogMasonry1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/blog-masonry-1.html';
  readonly pageTitle = 'frontoffice-blog-masonry-1';
}
