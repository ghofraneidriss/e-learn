import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-uc-toastr-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './uc-toastr.component.html',
  styleUrl: './uc-toastr.component.css'
})
export class UcToastrPageComponent {
  readonly pagePath = 'xhtml/uc-toastr.html';
  readonly pageTitle = 'uc-toastr';
}
