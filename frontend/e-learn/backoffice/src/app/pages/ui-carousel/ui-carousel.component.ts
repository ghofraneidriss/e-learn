import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-ui-carousel-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './ui-carousel.component.html',
  styleUrl: './ui-carousel.component.css'
})
export class UiCarouselPageComponent {
  readonly pagePath = 'xhtml/ui-carousel.html';
  readonly pageTitle = 'ui-carousel';
}
