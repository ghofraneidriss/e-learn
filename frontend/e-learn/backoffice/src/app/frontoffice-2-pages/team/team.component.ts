import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-team-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/team.html';
  readonly pageTitle = 'frontoffice-2-team';
}
