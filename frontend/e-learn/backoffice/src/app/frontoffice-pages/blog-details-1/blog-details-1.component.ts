import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-blog-details-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './blog-details-1.component.html',
  styleUrl: './blog-details-1.component.css'
})
export class BlogDetails1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/blog-details-1.html';
  readonly pageTitle = 'frontoffice-blog-details-1';
}
