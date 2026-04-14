import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CoursService } from '../../services/cours.service';
import { Cours } from '../../models/cours.model';

@Component({
    selector: 'app-course-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './course-form.component.html',
    styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
    editingId: number | null = null;
    loading = false;
    errorMessage = '';
    successMessage = '';

    readonly levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
    readonly statuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];
    readonly languages = ['English', 'French', 'Arabic', 'Spanish'];

    formModel: Cours = {
        title: '',
        description: '',
        category: '',
        language: 'English',
        level: 'BEGINNER',
        price: 0,
        duration: '',
        instructor: '',
        status: 'DRAFT',
        cover: '',
        video: ''
    };

    constructor(
        private readonly coursService: CoursService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.editingId = +id;
            this.loadCourse(this.editingId);
        }
    }

    loadCourse(id: number): void {
        this.loading = true;
        this.coursService.getAllCours().subscribe({
            next: (data) => {
                const course = data.find(c => c.id === id);
                if (course) {
                    this.formModel = { ...course };
                } else {
                    this.errorMessage = 'Cours introuvable.';
                }
                this.loading = false;
            },
            error: () => {
                this.errorMessage = 'Erreur lors du chargement du cours.';
                this.loading = false;
            }
        });
    }

    saveCourse(): void {
        this.errorMessage = '';
        this.successMessage = '';

        if (!this.formModel.title?.trim() || !this.formModel.instructor?.trim()) {
            this.errorMessage = 'Veuillez remplir les champs obligatoires (Titre, Instructeur).';
            return;
        }

        if (this.editingId === null) {
            this.coursService.createCours(this.formModel).subscribe({
                next: () => {
                    this.successMessage = 'Cours ajouté avec succès.';
                    setTimeout(() => this.router.navigate(['/admin/courses']), 1500);
                },
                error: () => this.errorMessage = "Erreur lors de l'ajout du cours."
            });
        } else {
            this.coursService.updateCours(this.editingId, this.formModel).subscribe({
                next: () => {
                    this.successMessage = 'Cours modifié avec succès.';
                    setTimeout(() => this.router.navigate(['/admin/courses']), 1500);
                },
                error: () => this.errorMessage = 'Erreur lors de la modification du cours.'
            });
        }
    }
}
