import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-form-element-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './form-element.component.html',
  styleUrl: './form-element.component.css'
})
export class FormElementPageComponent {
  readonly pagePath = 'xhtml/form-element.html';
  readonly pageTitle = 'form-element';
}
