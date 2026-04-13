import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-uc-select2-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './uc-select2.component.html',
  styleUrl: './uc-select2.component.css'
})
export class UcSelect2PageComponent {
  readonly pagePath = 'xhtml/uc-select2.html';
  readonly pageTitle = 'uc-select2';
}
