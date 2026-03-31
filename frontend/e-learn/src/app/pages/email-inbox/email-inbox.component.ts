import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-email-inbox-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './email-inbox.component.html',
  styleUrl: './email-inbox.component.css'
})
export class EmailInboxPageComponent {
  readonly pagePath = 'xhtml/email-inbox.html';
  readonly pageTitle = 'email-inbox';
}
