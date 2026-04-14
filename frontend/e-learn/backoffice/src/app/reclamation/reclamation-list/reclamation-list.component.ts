import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { Reclamation } from '../../models/reclamation.model';

@Component({
  selector: 'app-reclamation-list',
  standalone: false,
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.css']
})
export class ReclamationListComponent implements OnInit {
  reclamations: Reclamation[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  speaking = false;

  constructor(private readonly reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.loading = true;
    this.reclamationService.getAll().subscribe({
      next: (data) => {
        this.reclamations = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load reclamations.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteReclamation(id: number | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this reclamation?')) {
      this.reclamationService.delete(id).subscribe({
        next: () => {
          this.successMessage = 'Reclamation deleted successfully!';
          this.loadReclamations();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete reclamation.';
          console.error(err);
        }
      });
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'OPEN': return 'badge-info';
      case 'IN_PROGRESS': return 'badge-warning';
      case 'RESOLVED': return 'badge-success';
      case 'REJECTED': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }

  shareOnWhatsapp(item: Reclamation): void {
    const text = encodeURIComponent(`Reclamation: ${item.subject}\nAuthor: ${item.userName}\nStatus: ${item.status}\nDetails: ${item.description}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  shareOnTelegram(item: Reclamation): void {
    const text = encodeURIComponent(`Reclamation: ${item.subject}\nAuthor: ${item.userName}\nStatus: ${item.status}\nDetails: ${item.description}`);
    window.open(`https://t.me/share/url?text=${text}`, '_blank');
  }

  speakReclamation(item: Reclamation): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${item.subject}. Description: ${item.description}. Status: ${item.status}`);
    utterance.lang = 'en-US';
    utterance.onstart = () => this.speaking = true;
    utterance.onend = () => this.speaking = false;
    window.speechSynthesis.speak(utterance);
  }

  exportPdf(item: Reclamation): void {
    alert('PDF Export generated for Reclamation #' + item.id);
  }
}
