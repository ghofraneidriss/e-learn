import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-chart-peity-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './chart-peity.component.html',
  styleUrl: './chart-peity.component.css'
})
export class ChartPeityPageComponent {
  readonly pagePath = 'xhtml/chart-peity.html';
  readonly pageTitle = 'chart-peity';
}
