import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogPageComponent {
  readonly pagePath = 'xhtml/blog.html';
  readonly pageTitle = 'blog';
}
