import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OffreService } from '../../../core/services/offre.service';
import { Offre } from '../../../core/models/offre.model';

@Component({
  selector: 'app-enseignant-offre-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './offre-list.component.html'
})
export class EnseignantOffreListComponent implements OnInit {
  offres: Offre[] = [];
  error = '';

  constructor(private offreService: OffreService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.offreService.getMesOffres().subscribe({
      next: data => this.offres = data,
      error: () => this.error = 'Impossible de charger vos offres.'
    });
  }

  toggle(offre: Offre) {
    this.offreService.toggleActif(offre.id).subscribe({
      next: () => this.load(),
      error: () => this.error = 'Erreur lors du changement de statut.'
    });
  }

  delete(id: number) {
    if (!confirm('Supprimer cette offre ?')) return;
    this.offreService.deleteOffre(id).subscribe({
      next: () => this.load(),
      error: () => this.error = 'Erreur lors de la suppression.'
    });
  }
}
