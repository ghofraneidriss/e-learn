import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-2-management-consulting-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './management-consulting.component.html',
  styleUrl: './management-consulting.component.css'
})
export class ManagementConsultingFrontoffice2PageComponent {
  readonly pagePath = 'frontoffice/eduact-html/eduact-html/management-consulting.html';
  readonly pageTitle = 'frontoffice-2-management-consulting';
}
