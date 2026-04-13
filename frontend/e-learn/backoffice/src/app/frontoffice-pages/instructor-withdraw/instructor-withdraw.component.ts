import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-frontoffice-instructor-withdraw-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './instructor-withdraw.component.html',
  styleUrl: './instructor-withdraw.component.css'
})
export class InstructorWithdrawFrontofficePageComponent {
  readonly pagePath = 'frontoffice/template/instructor-withdraw.html';
  readonly pageTitle = 'frontoffice-instructor-withdraw';
}
