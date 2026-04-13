import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-left-sidebar-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-left-sidebar-1.component.html',
  styleUrl: './blog-left-sidebar-1.component.css'
})
export class BlogLeftSidebar1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/blog-left-sidebar-1.html';
  readonly pageTitle = 'frontoffice-blog-left-sidebar-1';
}
