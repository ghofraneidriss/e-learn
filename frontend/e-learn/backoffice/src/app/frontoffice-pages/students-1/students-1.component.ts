import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-students-1-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './students-1.component.html',
  styleUrl: './students-1.component.css'
})
export class Students1FrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/students-1.html';
  readonly pageTitle = 'frontoffice-students-1';
}
