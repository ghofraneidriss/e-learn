import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-blog-list-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/blog-list.html';
  readonly pageTitle = 'frontoffice-2-blog-list';
}
