import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-edit-profile-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfilePageComponent {
  readonly pagePath = 'xhtml/edit-profile.html';
  readonly pageTitle = 'edit-profile';
}
