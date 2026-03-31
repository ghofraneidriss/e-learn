import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-email-compose-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './email-compose.component.html',
  styleUrl: './email-compose.component.css'
})
export class EmailComposePageComponent {
  readonly pagePath = 'xhtml/email-compose.html';
  readonly pageTitle = 'email-compose';
}
