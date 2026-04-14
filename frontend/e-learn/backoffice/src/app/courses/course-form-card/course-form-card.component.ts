import { Component, EventEmitter, Output } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

@Component({
    selector: 'app-course-form-card',
    templateUrl: './course-form-card.component.html',
    styleUrls: ['./course-form-card.component.css'],
    standalone: false
})
export class CourseFormCardComponent {
    @Output() courseCreated = new EventEmitter<void>();

    course: Course = this.initCourse();
    loading = false;
    successMessage = '';
    errorMessage = '';
    generatingDescription = false;

    coverFile: File | null = null;
    videoFile: File | null = null;

    levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

    constructor(private courseService: CourseService) { }

    onFileSelected(event: any, type: 'cover' | 'video') {
        if (type === 'cover') {
            this.coverFile = event.target.files[0];
        } else {
            this.videoFile = event.target.files[0];
        }
    }

    generateDescription() {
        if (!this.course.title) {
            this.errorMessage = 'Please enter a title first.';
            return;
        }
        this.generatingDescription = true;
        this.courseService.generateCaption(this.course.title).subscribe({
            next: (desc) => {
                this.course.description = desc;
                this.generatingDescription = false;
                this.errorMessage = '';
            },
            error: () => {
                this.errorMessage = 'Failed to generate description.';
                this.generatingDescription = false;
            }
        });
    }

    onSubmit() {
        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';

        this.courseService.createCourse(this.course).subscribe({
            next: (created) => {
                this.handleFileUploads(created.id);
            },
            error: () => {
                this.errorMessage = 'Failed to create course.';
                this.loading = false;
            }
        });
    }

    private handleFileUploads(courseId: number) {
        const uploads = [];
        if (this.coverFile) {
            uploads.push(this.courseService.uploadImage(courseId, this.coverFile));
        }
        if (this.videoFile) {
            uploads.push(this.courseService.uploadVideo(courseId, this.videoFile));
        }

        if (uploads.length === 0) {
            this.finalizeCreation();
            return;
        }

        // Since we handle multiple potentially, but simplicity for now:
        let completed = 0;
        uploads.forEach(obs => {
            obs.subscribe({
                next: () => {
                    completed++;
                    if (completed === uploads.length) this.finalizeCreation();
                },
                error: () => {
                    this.errorMessage = 'Course created but files failed to upload.';
                    this.finalizeCreation();
                }
            });
        });
    }

    private finalizeCreation() {
        this.successMessage = 'Course created successfully!';
        this.loading = false;
        this.course = this.initCourse();
        this.coverFile = null;
        this.videoFile = null;
        this.courseCreated.emit();
        setTimeout(() => this.successMessage = '', 3000);
    }

    resetForm() {
        this.course = this.initCourse();
        this.coverFile = null;
        this.videoFile = null;
        this.errorMessage = '';
        this.successMessage = '';
    }

    private initCourse(): Course {
        return {
            id: 0,
            title: '',
            description: '',
            cover: '',
            video: '',
            category: '',
            language: '',
            level: 'BEGINNER',
            price: 0,
            duration: '',
            instructor: ''
        };
    }
}
