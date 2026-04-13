import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-blog-details-right-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-details-right.component.html',
  styleUrl: './blog-details-right.component.css'
})
export class BlogDetailsRightFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/blog-details-right.html';
  readonly pageTitle = 'frontoffice-2-blog-details-right';
}
