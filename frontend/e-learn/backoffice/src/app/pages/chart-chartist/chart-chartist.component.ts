import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-chart-chartist-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './chart-chartist.component.html',
  styleUrl: './chart-chartist.component.css'
})
export class ChartChartistPageComponent {
  readonly pagePath = 'xhtml/chart-chartist.html';
  readonly pageTitle = 'chart-chartist';
}
