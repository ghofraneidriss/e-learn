import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-details-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/blog-details.html';
  readonly pageTitle = 'frontoffice-blog-details';
}
