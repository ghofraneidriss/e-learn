import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoursService } from '../../services/cours.service';
import { Cours } from '../../models/cours.model';

@Component({
    selector: 'app-student-courses-page',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './student-courses.component.html',
    styleUrl: './student-courses.component.css'
})
export class StudentCoursesPageComponent implements OnInit {
    allCourses: Cours[] = [];
    filteredCourses: Cours[] = [];
    topCourses: Cours[] = [];
    selectedCourse: Cours | null = null;
    summary = '';
    loadingSummary = false;
    showModal = false;
    loading = false;
    errorMsg = '';

    searchText = '';
    filterLevel = '';
    filterCategory = '';
    viewMode: 'grid' | 'list' = 'grid';
    categories: string[] = [];
    levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

    speaking = false;
    ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

    constructor(
        private readonly svc: CoursService,
        private readonly cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loading = true;
        this.svc.getAllCours().subscribe({
            next: (data) => {
                this.allCourses = (data || []).filter(c => c.status === 'PUBLISHED' || !c.status);
                this.categories = [...new Set(this.allCourses.map(c => c.category).filter(Boolean) as string[])];
                this.applyFilters();
                this.loading = false;
            },
            error: () => { this.errorMsg = 'Could not load courses. Please try again.'; this.loading = false; }
        });

        // Load top courses separately (all courses, sorted by price desc as proxy for top)
        this.svc.getAllCours().subscribe({
            next: (data) => {
                this.topCourses = (data || []).slice().sort((a, b) => (b.price || 0) - (a.price || 0)).slice(0, 3);
            }
        });
    }

    applyFilters(): void {
        let result = [...this.allCourses];
        if (this.searchText.trim()) {
            result = result.filter(c =>
                c.title?.toLowerCase().includes(this.searchText.toLowerCase()) ||
                c.instructor?.toLowerCase().includes(this.searchText.toLowerCase()) ||
                c.category?.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }
        if (this.filterLevel) result = result.filter(c => c.level === this.filterLevel);
        if (this.filterCategory) result = result.filter(c => c.category === this.filterCategory);
        this.filteredCourses = result;
    }

    resetFilters(): void {
        this.searchText = '';
        this.filterLevel = '';
        this.filterCategory = '';
        this.applyFilters();
    }

    openDetail(course: Cours): void {
        this.selectedCourse = course;
        this.summary = '';
        this.showModal = true;
        document.body.style.overflow = 'hidden';
    }

    closeModal(): void {
        this.showModal = false;
        this.selectedCourse = null;
        this.summary = '';
        this.speaking = false;
        window.speechSynthesis.cancel();
        document.body.style.overflow = '';
    }

    loadSummary(): void {
        if (!this.selectedCourse?.id) return;
        this.loadingSummary = true;
        this.svc.getCoursById(this.selectedCourse.id).subscribe({
            next: (fullCourse) => {
                // Build an AI-style summary from available fields
                this.summary = `This course, "${fullCourse.title}", taught by ${fullCourse.instructor}, is a ${fullCourse.level} level course in the field of ${fullCourse.category}. It is available in ${fullCourse.language} and spans ${fullCourse.duration}. The course covers: ${fullCourse.description || 'various key topics in this field.'}. Students can expect practical knowledge at a price of $${fullCourse.price}.`;
                this.loadingSummary = false;
            },
            error: () => { this.loadingSummary = false; }
        });
    }

    speakCourse(course: Cours): void {
        if (!this.ttsSupported) return;
        window.speechSynthesis.cancel();
        const text = `${course.title} by ${course.instructor}. Level: ${course.level}. ${course.description ?? ''}`;
        const utt = new SpeechSynthesisUtterance(text);
        utt.lang = 'en-US';
        utt.onstart = () => { this.speaking = true; this.cdr.detectChanges(); };
        utt.onend = () => { this.speaking = false; this.cdr.detectChanges(); };
        window.speechSynthesis.speak(utt);
    }

    stopSpeech(): void {
        window.speechSynthesis.cancel();
        this.speaking = false;
    }

    shareWhatsApp(course: Cours): void {
        const text = encodeURIComponent(`📚 *${course.title}*\n👨‍🏫 ${course.instructor}\n🏷️ ${course.level} | ${course.category}\n💰 $${course.price} | ⏱️ ${course.duration}\n\n${course.description}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }

    shareTelegram(course: Cours): void {
        const text = encodeURIComponent(`📚 ${course.title} by ${course.instructor} — $${course.price}`);
        window.open(`https://t.me/share/url?text=${text}`, '_blank');
    }

    exportDetails(course: Cours): void {
        const content = [
            `Course Title: ${course.title}`,
            `Instructor:   ${course.instructor}`,
            `Category:     ${course.category}`,
            `Level:        ${course.level}`,
            `Language:     ${course.language}`,
            `Price:        $${course.price}`,
            `Duration:     ${course.duration}`,
            `Description:\n${course.description}`
        ].join('\n');
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `course-details-${course.id}.txt`;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    getLevelClass(level?: string): string {
        switch (level?.toUpperCase()) {
            case 'BEGINNER': return 'chip--green';
            case 'INTERMEDIATE': return 'chip--orange';
            case 'ADVANCED': return 'chip--red';
            default: return 'chip--blue';
        }
    }

    getCoverUrl(course: Cours): string {
        if (!course.cover) return '/frontoffice/eduact-html/assets/images/course/course-2-1.png';
        if (course.cover.startsWith('http')) return course.cover;
        return `http://localhost:8085/api/cours/uploads/${course.cover}`;
    }

    get totalCount() { return this.filteredCourses.length; }
    get hasResults() { return this.filteredCourses.length > 0; }
}
