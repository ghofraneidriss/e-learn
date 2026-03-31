import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-map-jqvmap-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './map-jqvmap.component.html',
  styleUrl: './map-jqvmap.component.css'
})
export class MapJqvmapPageComponent {
  readonly pagePath = 'xhtml/map-jqvmap.html';
  readonly pageTitle = 'map-jqvmap';
}
