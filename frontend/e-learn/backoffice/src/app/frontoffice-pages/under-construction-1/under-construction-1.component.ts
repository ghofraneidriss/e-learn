import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-under-construction-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './under-construction-1.component.html',
  styleUrl: './under-construction-1.component.css'
})
export class UnderConstruction1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/under-construction-1.html';
  readonly pageTitle = 'frontoffice-under-construction-1';
}
