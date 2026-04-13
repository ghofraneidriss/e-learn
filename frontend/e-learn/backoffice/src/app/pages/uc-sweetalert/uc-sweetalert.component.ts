import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-uc-sweetalert-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './uc-sweetalert.component.html',
  styleUrl: './uc-sweetalert.component.css'
})
export class UcSweetalertPageComponent {
  readonly pagePath = 'xhtml/uc-sweetalert.html';
  readonly pageTitle = 'uc-sweetalert';
}
