import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  private readonly sanitizer = inject(DomSanitizer);
  
  get frameUrl(): SafeResourceUrl {
    const path = this.pagePath.startsWith('/') ? this.pagePath : `/${this.pagePath}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }
}
