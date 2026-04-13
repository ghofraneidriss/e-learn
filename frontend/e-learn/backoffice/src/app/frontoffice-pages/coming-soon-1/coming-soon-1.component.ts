import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-coming-soon-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './coming-soon-1.component.html',
  styleUrl: './coming-soon-1.component.css'
})
export class ComingSoon1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/coming-soon-1.html';
  readonly pageTitle = 'frontoffice-coming-soon-1';
}
