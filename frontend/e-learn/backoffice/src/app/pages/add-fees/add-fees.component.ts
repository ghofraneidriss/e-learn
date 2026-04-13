import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-add-fees-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './add-fees.component.html',
  styleUrl: './add-fees.component.css'
})
export class AddFeesPageComponent {
  readonly pagePath = 'xhtml/add-fees.html';
  readonly pageTitle = 'add-fees';
}
