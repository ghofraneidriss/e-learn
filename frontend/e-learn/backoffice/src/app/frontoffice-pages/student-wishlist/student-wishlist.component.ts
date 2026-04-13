import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-wishlist-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-wishlist.component.html',
  styleUrl: './student-wishlist.component.css'
})
export class StudentWishlistFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/student-wishlist.html';
  readonly pageTitle = 'frontoffice-student-wishlist';
}
