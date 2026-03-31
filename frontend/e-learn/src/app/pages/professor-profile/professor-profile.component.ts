import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-professor-profile-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './professor-profile.component.html',
  styleUrl: './professor-profile.component.css'
})
export class ProfessorProfilePageComponent {
  readonly pagePath = 'xhtml/professor-profile.html';
  readonly pageTitle = 'professor-profile';
}
