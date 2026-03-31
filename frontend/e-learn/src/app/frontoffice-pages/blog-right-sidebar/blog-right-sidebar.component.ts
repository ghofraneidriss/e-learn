import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-right-sidebar-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-right-sidebar.component.html',
  styleUrl: './blog-right-sidebar.component.css'
})
export class BlogRightSidebarFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/blog-right-sidebar.html';
  readonly pageTitle = 'frontoffice-blog-right-sidebar';
}
