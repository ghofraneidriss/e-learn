import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-uc-nestable-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './uc-nestable.component.html',
  styleUrl: './uc-nestable.component.css'
})
export class UcNestablePageComponent {
  readonly pagePath = 'xhtml/uc-nestable.html';
  readonly pageTitle = 'uc-nestable';
}
