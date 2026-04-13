import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-chart-flot-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './chart-flot.component.html',
  styleUrl: './chart-flot.component.css'
})
export class ChartFlotPageComponent {
  readonly pagePath = 'xhtml/chart-flot.html';
  readonly pageTitle = 'chart-flot';
}
