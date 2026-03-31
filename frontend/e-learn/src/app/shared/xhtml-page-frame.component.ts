import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-xhtml-page-frame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xhtml-page-frame.component.html',
  styleUrl: './xhtml-page-frame.component.css'
})
export class XhtmlPageFrameComponent {
  @Input({ required: true }) pagePath!: string;
  @Input({ required: true }) pageTitle!: string;

  get frameSrc(): string {
    return this.pagePath.startsWith('/') ? this.pagePath : `/${this.pagePath}`;
  }
}
