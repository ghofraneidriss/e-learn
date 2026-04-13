import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-student-linked-accounts-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './student-linked-accounts.component.html',
  styleUrl: './student-linked-accounts.component.css'
})
export class StudentLinkedAccountsFrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/student-linked-accounts.html';
  readonly pageTitle = 'frontoffice-student-linked-accounts';
}
