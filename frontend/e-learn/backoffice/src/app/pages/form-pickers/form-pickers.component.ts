import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-form-pickers-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './form-pickers.component.html',
  styleUrl: './form-pickers.component.css'
})
export class FormPickersPageComponent {
  readonly pagePath = 'xhtml/form-pickers.html';
  readonly pageTitle = 'form-pickers';
}
