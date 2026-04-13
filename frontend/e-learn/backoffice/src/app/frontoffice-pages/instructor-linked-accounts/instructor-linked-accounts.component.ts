import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-linked-accounts-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-linked-accounts.component.html',
  styleUrl: './instructor-linked-accounts.component.css'
})
export class InstructorLinkedAccountsFrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-linked-accounts.html';
  readonly pageTitle = 'frontoffice-instructor-linked-accounts';
}
