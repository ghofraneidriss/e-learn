import { Component } from '@angular/core';
import { XhtmlPageFrameComponent } from '../../shared/xhtml-page-frame.component';

@Component({
  selector: 'app-form-ckeditor-page',
  standalone: true,
  imports: [XhtmlPageFrameComponent],
  templateUrl: './form-ckeditor.component.html',
  styleUrl: './form-ckeditor.component.css'
})
export class FormCkeditorPageComponent {
  readonly pagePath = 'xhtml/form-ckeditor.html';
  readonly pageTitle = 'form-ckeditor';
}
