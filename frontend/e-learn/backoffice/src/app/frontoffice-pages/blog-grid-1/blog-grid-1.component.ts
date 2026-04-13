import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-grid-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-grid-1.component.html',
  styleUrl: './blog-grid-1.component.css'
})
export class BlogGrid1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/blog-grid-1.html';
  readonly pageTitle = 'frontoffice-blog-grid-1';
}
