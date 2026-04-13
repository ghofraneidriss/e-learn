import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-team-carousel-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './team-carousel.component.html',
  styleUrl: './team-carousel.component.css'
})
export class TeamCarouselFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/team-carousel.html';
  readonly pageTitle = 'frontoffice-2-team-carousel';
}
