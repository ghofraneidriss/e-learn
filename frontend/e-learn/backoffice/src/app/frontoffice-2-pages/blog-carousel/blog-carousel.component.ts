import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-blog-carousel-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-carousel.component.html',
  styleUrl: './blog-carousel.component.css'
})
export class BlogCarouselFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/blog-carousel.html';
  readonly pageTitle = 'frontoffice-2-blog-carousel';
}
