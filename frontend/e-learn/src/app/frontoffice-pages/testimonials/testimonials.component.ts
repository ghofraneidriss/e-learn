import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-testimonials-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/testimonials.html';
  readonly pageTitle = 'frontoffice-testimonials';
}
