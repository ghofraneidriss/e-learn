import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OffreService } from '../../../core/services/offre.service';
import { AbonnementService } from '../../../core/services/abonnement.service';
import { Offre } from '../../../core/models/offre.model';
import { MethodePaiement } from '../../../core/models/abonnement.model';

@Component({
  selector: 'app-offre-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './offre-list.component.html'
})
export class OffreListComponent implements OnInit {
  offres: Offre[] = [];
  error = '';
  successMessage = '';

  // Payment modal state
  selectedOffre: Offre | null = null;
  showModal = false;
  paying = false;
  paymentDone = false;

  // Payment form
  methodePaiement: MethodePaiement = 'CARTE_BANCAIRE';
  nomTitulaire = '';
  numeroCarte = '';
  expiryCarte = '';
  cvv = '';
  paypalEmail = '';

  constructor(
    private offreService: OffreService,
    private abonnementService: AbonnementService
  ) {}

  ngOnInit() {
    this.offreService.getOffresActives().subscribe({
      next: data => this.offres = data,
      error: () => this.error = 'Impossible de charger les offres.'
    });
  }

  openPayment(offre: Offre) {
    this.selectedOffre = offre;
    this.showModal = true;
    this.paymentDone = false;
    this.paying = false;
    this.nomTitulaire = '';
    this.numeroCarte = '';
    this.expiryCarte = '';
    this.cvv = '';
    this.paypalEmail = '';
    this.error = '';
  }

  closeModal() {
    this.showModal = false;
    this.selectedOffre = null;
  }

  confirmerPaiement() {
    if (!this.selectedOffre) return;
    this.paying = true;
    this.error = '';

    // Simulate payment processing delay
    setTimeout(() => {
      this.abonnementService.souscrire({
        offreId: this.selectedOffre!.id,
        methodePaiement: this.methodePaiement,
        nomTitulaire: this.nomTitulaire
      }).subscribe({
        next: res => {
          this.paying = false;
          this.paymentDone = true;
          this.successMessage = `Paiement confirmé ! Réf: ${res.referenceTransaction}`;
        },
        error: err => {
          this.paying = false;
          this.error = err.error?.message || 'Erreur lors du paiement.';
        }
      });
    }, 1500);
  }

  formatCarte(val: string): string {
    return val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  }

  onCarteInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.numeroCarte = this.formatCarte(input.value);
    input.value = this.numeroCarte;
  }

  typeColor(type: string) {
    return { 'BASIC': '#6c757d', 'PREMIUM': '#4f46e5', 'VIP': '#f59e0b' }[type] || '#6c757d';
  }

  niveauLabel(n: string) {
    return { 'DEBUTANT': '🟢 Débutant', 'INTERMEDIAIRE': '🟡 Intermédiaire', 'AVANCE': '🔴 Avancé' }[n] || n;
  }

  setMethode(m: string) {
    this.methodePaiement = m as MethodePaiement;
  }

  isFormValid(): boolean {
    if (!this.nomTitulaire) return false;
    if (this.methodePaiement === 'CARTE_BANCAIRE') {
      return this.numeroCarte.replace(/\s/g, '').length === 16 && !!this.expiryCarte && this.cvv.length >= 3;
    }
    if (this.methodePaiement === 'PAYPAL') return !!this.paypalEmail;
    return true;
  }
}
