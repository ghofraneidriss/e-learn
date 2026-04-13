import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-chart-sparkline-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './chart-sparkline.component.html',
  styleUrl: './chart-sparkline.component.css'
})
export class ChartSparklinePageComponent {
  readonly pagePath = 'xhtml/chart-sparkline.html';
  readonly pageTitle = 'chart-sparkline';
}
