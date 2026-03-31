import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-app-calender-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './app-calender.component.html',
  styleUrl: './app-calender.component.css'
})
export class AppCalenderPageComponent {
  readonly pagePath = 'xhtml/app-calender.html';
  readonly pageTitle = 'app-calender';
}
