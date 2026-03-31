import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-fees-collection-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './fees-collection.component.html',
  styleUrl: './fees-collection.component.css'
})
export class FeesCollectionPageComponent {
  readonly pagePath = 'xhtml/fees-collection.html';
  readonly pageTitle = 'fees-collection';
}
