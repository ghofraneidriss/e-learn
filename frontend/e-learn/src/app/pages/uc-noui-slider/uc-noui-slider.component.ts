import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-uc-noui-slider-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './uc-noui-slider.component.html',
  styleUrl: './uc-noui-slider.component.css'
})
export class UcNouiSliderPageComponent {
  readonly pagePath = 'xhtml/uc-noui-slider.html';
  readonly pageTitle = 'uc-noui-slider';
}
