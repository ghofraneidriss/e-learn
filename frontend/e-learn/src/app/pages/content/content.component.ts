import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentPageComponent {
  readonly pagePath = 'xhtml/content.html';
  readonly pageTitle = 'content';
}
