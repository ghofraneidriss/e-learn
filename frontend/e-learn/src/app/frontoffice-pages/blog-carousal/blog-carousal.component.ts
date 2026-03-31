import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-carousal-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-carousal.component.html',
  styleUrl: './blog-carousal.component.css'
})
export class BlogCarousalFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/blog-carousal.html';
  readonly pageTitle = 'frontoffice-blog-carousal';
}
