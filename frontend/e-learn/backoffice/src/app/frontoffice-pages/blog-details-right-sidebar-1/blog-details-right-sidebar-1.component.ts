import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-details-right-sidebar-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-details-right-sidebar-1.component.html',
  styleUrl: './blog-details-right-sidebar-1.component.css'
})
export class BlogDetailsRightSidebar1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/blog-details-right-sidebar-1.html';
  readonly pageTitle = 'frontoffice-blog-details-right-sidebar-1';
}
