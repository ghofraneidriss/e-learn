import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OffreService } from '../../../core/services/offre.service';

@Component({
  selector: 'app-offre-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './offre-form.component.html'
})
export class OffreFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  offreId?: number;
  error = '';

  types = ['BASIC', 'PREMIUM', 'VIP'];
  niveaux = ['DEBUTANT', 'INTERMEDIAIRE', 'AVANCE'];

  // Tag inputs
  newMatiere = '';
  newAvantage = '';
  matieres: string[] = [];
  avantages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private offreService: OffreService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      prix: [null, [Validators.required, Validators.min(0)]],
      dureeEnMois: [null, [Validators.required, Validators.min(1)]],
      type: ['BASIC', Validators.required],
      niveau: ['DEBUTANT', Validators.required],
      nombreCoursInclus: [0],
      nombreQuizInclus: [0]
    });

    this.offreId = this.route.snapshot.params['id'];
    if (this.offreId) {
      this.isEdit = true;
      this.offreService.getOffre(this.offreId).subscribe({
        next: offre => {
          this.form.patchValue(offre);
          this.matieres = offre.matieres ?? [];
          this.avantages = offre.avantages ?? [];
        },
        error: () => this.error = 'Offre introuvable.'
      });
    }
  }

  addMatiere(event?: Event) {
    event?.preventDefault();
    const v = this.newMatiere.trim();
    if (v && !this.matieres.includes(v)) this.matieres.push(v);
    this.newMatiere = '';
  }

  removeMatiere(i: number) { this.matieres.splice(i, 1); }

  addAvantage(event?: Event) {
    event?.preventDefault();
    const v = this.newAvantage.trim();
    if (v) this.avantages.push(v);
    this.newAvantage = '';
  }

  removeAvantage(i: number) { this.avantages.splice(i, 1); }

  submit() {
    if (this.form.invalid) return;
    const request = { ...this.form.value, matieres: this.matieres, avantages: this.avantages };

    const action = this.isEdit
      ? this.offreService.updateOffre(this.offreId!, request)
      : this.offreService.createOffre(request);

    action.subscribe({
      next: () => this.router.navigate(['/enseignant/offres']),
      error: err => this.error = err.error?.message || 'Erreur lors de la sauvegarde.'
    });
  }
}
