import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-email-template-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './email-template.component.html',
  styleUrl: './email-template.component.css'
})
export class EmailTemplatePageComponent {
  readonly pagePath = 'xhtml/email-template.html';
  readonly pageTitle = 'email-template';
}
