import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-chart-morris-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './chart-morris.component.html',
  styleUrl: './chart-morris.component.css'
})
export class ChartMorrisPageComponent {
  readonly pagePath = 'xhtml/chart-morris.html';
  readonly pageTitle = 'chart-morris';
}
