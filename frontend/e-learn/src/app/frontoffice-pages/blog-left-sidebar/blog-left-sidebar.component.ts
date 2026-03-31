import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-left-sidebar-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-left-sidebar.component.html',
  styleUrl: './blog-left-sidebar.component.css'
})
export class BlogLeftSidebarFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/blog-left-sidebar.html';
  readonly pageTitle = 'frontoffice-blog-left-sidebar';
}
