import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-blog-list-left-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-list-left.component.html',
  styleUrl: './blog-list-left.component.css'
})
export class BlogListLeftFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/blog-list-left.html';
  readonly pageTitle = 'frontoffice-2-blog-list-left';
}
