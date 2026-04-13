import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-team-details-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.css'
})
export class TeamDetailsFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/team-details.html';
  readonly pageTitle = 'frontoffice-2-team-details';
}
