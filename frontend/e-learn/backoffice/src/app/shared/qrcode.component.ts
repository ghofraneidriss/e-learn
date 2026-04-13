import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'qrcode',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="qr-root" [style.width.px]="width" [style.height.px]="width">
      <p class="qr-label">QR Payload</p>
      <p class="qr-data">{{ qrdata || 'Aucun contenu' }}</p>
      <small class="qr-meta">lvl: {{ errorCorrectionLevel }}</small>
    </div>
  `,
  styles: [
    `
      .qr-root {
        border-radius: 0.75rem;
        border: 1px solid #dce0ea;
        background: #fff;
        padding: 1rem;
        box-shadow: inset 0 0 0 1px #f1f2f7;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-family: 'Inter', sans-serif;
        font-size: 0.75rem;
        color: #3a3b53;
      }

      .qr-label {
        margin: 0;
        font-weight: 700;
        color: #0f1f3c;
      }

      .qr-data {
        margin: 0;
        word-break: break-word;
        line-height: 1.2;
      }

      .qr-meta {
        margin: 0;
        color: #7c8194;
      }
    `
  ]
})
export class QrcodeComponent {
  @Input({ required: true }) qrdata!: string;
  @Input() width = 170;
  @Input() errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H' = 'M';
}
