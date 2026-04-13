import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuPageComponent {
  readonly pagePath = 'xhtml/menu.html';
  readonly pageTitle = 'menu';
}
