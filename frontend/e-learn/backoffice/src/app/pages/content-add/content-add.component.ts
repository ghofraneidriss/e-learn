import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-content-add-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './content-add.component.html',
  styleUrl: './content-add.component.css'
})
export class ContentAddPageComponent {
  readonly pagePath = 'xhtml/content-add.html';
  readonly pageTitle = 'content-add';
}
