import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-carousal-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-carousal-1.component.html',
  styleUrl: './blog-carousal-1.component.css'
})
export class BlogCarousal1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/blog-carousal-1.html';
  readonly pageTitle = 'frontoffice-blog-carousal-1';
}
