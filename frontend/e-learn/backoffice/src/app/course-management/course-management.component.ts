import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursService } from '../services/cours.service';
import { Cours } from '../models/cours.model';

@Component({
    selector: 'app-course-management',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './course-management.component.html',
    styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit {
    courses: Cours[] = [];
    loading = false;
    errorMessage = '';
    successMessage = '';
    editingId: number | null = null;
    speaking = false;
    ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

    selectedImage: File | null = null;
    selectedVideo: File | null = null;

    readonly levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
    readonly statuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];
    readonly languages = ['English', 'French', 'Arabic', 'Spanish'];

    formModel: Cours = this.emptyForm();

    constructor(
        private readonly coursService: CoursService,
        private readonly cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadCourses();
    }

    loadCourses(): void {
        this.loading = true;
        this.errorMessage = '';
        this.coursService.getAllCours().subscribe({
            next: (data) => {
                this.courses = data || [];
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.errorMessage = 'Impossible de charger les cours.';
                this.loading = false;
                this.cdr.detectChanges();
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

        const payload: Cours = { ...this.formModel };

        if (this.editingId === null) {
            this.coursService.createCours(payload).subscribe({
                next: (created) => {
                    this.handleFileUploads(created.id!);
                    this.successMessage = 'Cours ajoute avec succes.';
                    this.resetForm();
                    this.loadCourses();
                },
                error: () => { this.errorMessage = 'Erreur lors de l\'ajout du cours.'; }
            });
        } else {
            this.coursService.updateCours(this.editingId, payload).subscribe({
                next: (updated) => {
                    this.handleFileUploads(updated.id!);
                    this.successMessage = 'Cours modifie avec succes.';
                    this.resetForm();
                    this.loadCourses();
                },
                error: () => { this.errorMessage = 'Erreur lors de la modification du cours.'; }
            });
        }
    }

    private handleFileUploads(courseId: number): void {
        if (this.selectedImage) {
            this.coursService.uploadImage(courseId, this.selectedImage).subscribe();
        }
        if (this.selectedVideo) {
            this.coursService.uploadVideo(courseId, this.selectedVideo).subscribe();
        }
        this.selectedImage = null;
        this.selectedVideo = null;
    }

    onImageSelected(event: any): void {
        this.selectedImage = event.target.files[0];
    }

    onVideoSelected(event: any): void {
        this.selectedVideo = event.target.files[0];
    }

    startEdit(course: Cours): void {
        if (course.id === undefined) return;
        this.editingId = course.id;
        this.formModel = { ...course };
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    deleteCourse(id: number | undefined): void {
        if (!id || !confirm('Etes-vous sur de vouloir supprimer ce cours ?')) return;
        this.coursService.deleteCours(id).subscribe({
            next: () => {
                this.successMessage = 'Cours supprime avec succes.';
                this.loadCourses();
            },
            error: () => { this.errorMessage = 'Erreur lors de la suppression du cours.'; }
        });
    }

    resetForm(): void {
        this.editingId = null;
        this.formModel = this.emptyForm();
    }

    speakCourse(course: Cours): void {
        if (!this.ttsSupported) {
            this.errorMessage = 'Text-to-speech non supporte sur ce navigateur.';
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(
            `Cours: ${course.title}. Instructeur: ${course.instructor}. Niveau: ${course.level}. Prix: ${course.price} dollars. ${course.description || ''}`
        );
        utterance.lang = 'fr-FR';
        utterance.onstart = () => { this.speaking = true; this.cdr.detectChanges(); };
        utterance.onend = () => { this.speaking = false; this.cdr.detectChanges(); };
        window.speechSynthesis.speak(utterance);
    }

    stopSpeech(): void {
        window.speechSynthesis.cancel();
        this.speaking = false;
    }

    shareOnWhatsapp(course: Cours): void {
        const text = encodeURIComponent(`📚 Cours: ${course.title}\n👨‍🏫 Instructeur: ${course.instructor}\n🏷️ Niveau: ${course.level}\n💰 Prix: $${course.price}\n📝 ${course.description || ''}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }

    shareOnTelegram(course: Cours): void {
        const text = encodeURIComponent(`📚 ${course.title} par ${course.instructor} — $${course.price}`);
        window.open(`https://t.me/share/url?text=${text}`, '_blank');
    }

    exportCoursePdf(course: Cours): void {
        const lines = [
            `Course: ${course.title}`,
            `Instructor: ${course.instructor}`,
            `Category: ${course.category}`,
            `Level: ${course.level}`,
            `Language: ${course.language}`,
            `Price: $${course.price}`,
            `Duration: ${course.duration}`,
            `Status: ${course.status}`,
            `Description: ${course.description}`
        ].join('\n');
        const blob = new Blob([lines], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `cours-${course.id}.txt`;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    getLevelClass(level?: string): string {
        switch (level?.toUpperCase()) {
            case 'BEGINNER': return 'resolved';
            case 'INTERMEDIATE': return 'in-progress';
            case 'ADVANCED': return 'rejected';
            default: return 'open';
        }
    }

    getStatusClass(status?: string): string {
        switch (status) {
            case 'PUBLISHED': return 'resolved';
            case 'DRAFT': return 'in-progress';
            case 'ARCHIVED': return 'open';
            default: return 'open';
        }
    }

    getImageUrl(cover?: string): string {
        if (!cover) return '';
        if (cover.startsWith('http')) return cover;
        // In current setup, files are served from /images subpath of the backend (port 8085)
        return `http://localhost:8085/images/${cover}`;
    }

    private emptyForm(): Cours {
        return { title: '', description: '', category: '', language: 'English', level: 'BEGINNER', price: 0, duration: '', instructor: '', status: 'DRAFT', cover: '', video: '' };
    }
}
