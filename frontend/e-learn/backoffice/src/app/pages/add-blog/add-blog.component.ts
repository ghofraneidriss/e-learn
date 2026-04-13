import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-add-blog-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogPageComponent {
  readonly pagePath = 'xhtml/add-blog.html';
  readonly pageTitle = 'add-blog';
}
