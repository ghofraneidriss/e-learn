import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-under-construction-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './under-construction.component.html',
  styleUrl: './under-construction.component.css'
})
export class UnderConstructionFrontofficePageComponent {
  readonly pagePath = 'frontoffice-template/template/under-construction.html';
  readonly pageTitle = 'frontoffice-under-construction';
}
