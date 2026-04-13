import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-gallery-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/gallery.html';
  readonly pageTitle = 'frontoffice-2-gallery';
}
