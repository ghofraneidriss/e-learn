import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-blog-category-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-category.component.html',
  styleUrl: './blog-category.component.css'
})
export class BlogCategoryPageComponent {
  readonly pagePath = 'xhtml/blog-category.html';
  readonly pageTitle = 'blog-category';
}
