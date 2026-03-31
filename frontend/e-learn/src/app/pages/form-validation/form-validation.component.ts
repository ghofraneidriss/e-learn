import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-form-validation-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './form-validation.component.html',
  styleUrl: './form-validation.component.css'
})
export class FormValidationPageComponent {
  readonly pagePath = 'xhtml/form-validation.html';
  readonly pageTitle = 'form-validation';
}
