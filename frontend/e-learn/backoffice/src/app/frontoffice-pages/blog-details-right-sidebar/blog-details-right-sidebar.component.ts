import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-details-right-sidebar-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-details-right-sidebar.component.html',
  styleUrl: './blog-details-right-sidebar.component.css'
})
export class BlogDetailsRightSidebarFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/blog-details-right-sidebar.html';
  readonly pageTitle = 'frontoffice-blog-details-right-sidebar';
}
