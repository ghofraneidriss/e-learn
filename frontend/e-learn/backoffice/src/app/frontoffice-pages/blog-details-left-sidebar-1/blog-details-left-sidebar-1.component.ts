import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-details-left-sidebar-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-details-left-sidebar-1.component.html',
  styleUrl: './blog-details-left-sidebar-1.component.css'
})
export class BlogDetailsLeftSidebar1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/blog-details-left-sidebar-1.html';
  readonly pageTitle = 'frontoffice-blog-details-left-sidebar-1';
}
