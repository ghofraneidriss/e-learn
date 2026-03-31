import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-chart-chartjs-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './chart-chartjs.component.html',
  styleUrl: './chart-chartjs.component.css'
})
export class ChartChartjsPageComponent {
  readonly pagePath = 'xhtml/chart-chartjs.html';
  readonly pageTitle = 'chart-chartjs';
}
