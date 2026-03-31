import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-uc-lightgallery-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './uc-lightgallery.component.html',
  styleUrl: './uc-lightgallery.component.css'
})
export class UcLightgalleryPageComponent {
  readonly pagePath = 'xhtml/uc-lightgallery.html';
  readonly pageTitle = 'uc-lightgallery';
}
