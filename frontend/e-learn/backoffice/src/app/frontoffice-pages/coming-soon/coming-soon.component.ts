import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-coming-soon-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.css'
})
export class ComingSoonFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/coming-soon.html';
  readonly pageTitle = 'frontoffice-coming-soon';
}
