import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-blog-list-right-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-list-right.component.html',
  styleUrl: './blog-list-right.component.css'
})
export class BlogListRightFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/blog-list-right.html';
  readonly pageTitle = 'frontoffice-2-blog-list-right';
}
