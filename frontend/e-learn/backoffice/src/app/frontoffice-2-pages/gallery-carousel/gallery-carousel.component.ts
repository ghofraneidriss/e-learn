import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-gallery-carousel-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './gallery-carousel.component.html',
  styleUrl: './gallery-carousel.component.css'
})
export class GalleryCarouselFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/gallery-carousel.html';
  readonly pageTitle = 'frontoffice-2-gallery-carousel';
}
