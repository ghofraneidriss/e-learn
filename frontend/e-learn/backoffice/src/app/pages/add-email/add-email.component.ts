import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-add-email-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './add-email.component.html',
  styleUrl: './add-email.component.css'
})
export class AddEmailPageComponent {
  readonly pagePath = 'xhtml/add-email.html';
  readonly pageTitle = 'add-email';
}
