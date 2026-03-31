import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-email-read-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './email-read.component.html',
  styleUrl: './email-read.component.css'
})
export class EmailReadPageComponent {
  readonly pagePath = 'xhtml/email-read.html';
  readonly pageTitle = 'email-read';
}
