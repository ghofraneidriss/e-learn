import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-right-sidebar-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-right-sidebar-1.component.html',
  styleUrl: './blog-right-sidebar-1.component.css'
})
export class BlogRightSidebar1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/blog-right-sidebar-1.html';
  readonly pageTitle = 'frontoffice-blog-right-sidebar-1';
}
