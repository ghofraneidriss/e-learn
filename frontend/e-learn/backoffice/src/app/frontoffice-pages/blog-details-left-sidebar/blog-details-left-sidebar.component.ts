import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-details-left-sidebar-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-details-left-sidebar.component.html',
  styleUrl: './blog-details-left-sidebar.component.css'
})
export class BlogDetailsLeftSidebarFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/blog-details-left-sidebar.html';
  readonly pageTitle = 'frontoffice-blog-details-left-sidebar';
}
