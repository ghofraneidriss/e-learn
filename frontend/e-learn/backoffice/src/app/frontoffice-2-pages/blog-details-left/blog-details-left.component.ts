import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-blog-details-left-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-details-left.component.html',
  styleUrl: './blog-details-left.component.css'
})
export class BlogDetailsLeftFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/blog-details-left.html';
  readonly pageTitle = 'frontoffice-2-blog-details-left';
}
