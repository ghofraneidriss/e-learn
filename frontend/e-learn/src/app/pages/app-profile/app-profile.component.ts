import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-app-profile-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './app-profile.component.html',
  styleUrl: './app-profile.component.css'
})
export class AppProfilePageComponent {
  readonly pagePath = 'xhtml/app-profile.html';
  readonly pageTitle = 'app-profile';
}
