import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-testimonials-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './testimonials-1.component.html',
  styleUrl: './testimonials-1.component.css'
})
export class Testimonials1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/testimonials-1.html';
  readonly pageTitle = 'frontoffice-testimonials-1';
}
