import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-post-details-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsPageComponent {
  readonly pagePath = 'xhtml/post-details.html';
  readonly pageTitle = 'post-details';
}
