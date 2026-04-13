import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-2-grid-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-2-grid-1.component.html',
  styleUrl: './blog-2-grid-1.component.css'
})
export class Blog2Grid1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/blog-2-grid-1.html';
  readonly pageTitle = 'frontoffice-blog-2-grid-1';
}
