import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-wishlist-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-wishlist-1.component.html',
  styleUrl: './student-wishlist-1.component.css'
})
export class StudentWishlist1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-wishlist-1.html';
  readonly pageTitle = 'frontoffice-student-wishlist-1';
}
