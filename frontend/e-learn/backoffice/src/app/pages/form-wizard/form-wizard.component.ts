import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-form-wizard-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './form-wizard.component.html',
  styleUrl: './form-wizard.component.css'
})
export class FormWizardPageComponent {
  readonly pagePath = 'xhtml/form-wizard.html';
  readonly pageTitle = 'form-wizard';
}
