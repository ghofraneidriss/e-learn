import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AbonnementService } from '../../../core/services/abonnement.service';
import { Abonnement } from '../../../core/models/abonnement.model';

@Component({
  selector: 'app-mes-abonnements',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mes-abonnements.component.html'
})
export class MesAbonnementsComponent implements OnInit {
  abonnements: Abonnement[] = [];
  error = '';
  today = new Date();

  constructor(private abonnementService: AbonnementService) {}

  ngOnInit() {
    this.abonnementService.getMesAbonnements().subscribe({
      next: data => this.abonnements = data.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
      error: () => this.error = 'Impossible de charger vos abonnements.'
    });
  }

  daysRemaining(dateFin: string): number {
    const fin = new Date(dateFin);
    const diff = fin.getTime() - this.today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  progressPercent(dateDebut: string, dateFin: string): number {
    const debut = new Date(dateDebut).getTime();
    const fin = new Date(dateFin).getTime();
    const now = this.today.getTime();
    if (now >= fin) return 100;
    if (now <= debut) return 0;
    return Math.round(((now - debut) / (fin - debut)) * 100);
  }

  totalDays(dateDebut: string, dateFin: string): number {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    return Math.ceil((fin.getTime() - debut.getTime()) / (1000 * 60 * 60 * 24));
  }

  annuler(id: number) {
    if (!confirm('Annuler cet abonnement ?')) return;
    this.abonnementService.annuler(id).subscribe({
      next: () => this.abonnements = this.abonnements.map(a =>
        a.id === id ? { ...a, statut: 'ANNULE' } : a
      ),
      error: () => this.error = "Erreur lors de l'annulation."
    });
  }

  get actifs() { return this.abonnements.filter(a => a.statut === 'ACTIF'); }
  get autres() { return this.abonnements.filter(a => a.statut !== 'ACTIF'); }
}
