import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-team-become-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './team-become.component.html',
  styleUrl: './team-become.component.css'
})
export class TeamBecomeFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/team-become.html';
  readonly pageTitle = 'frontoffice-2-team-become';
}
