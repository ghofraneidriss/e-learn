import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-digital-photography-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './digital-photography.component.html',
  styleUrl: './digital-photography.component.css'
})
export class DigitalPhotographyFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/digital-photography.html';
  readonly pageTitle = 'frontoffice-2-digital-photography';
}
