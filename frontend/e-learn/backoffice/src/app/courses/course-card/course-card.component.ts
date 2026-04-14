import { Component, Input } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  standalone: false
})
export class CourseCardComponent {
  @Input() course!: Course;

  summary: string = '';
  loadingSummary: boolean = false;
  showSummary: boolean = false;

  constructor(private courseService: CourseService) { }

  fetchSummary() {
    if (this.showSummary) {
      this.showSummary = false;
      return;
    }

    if (this.summary) {
      this.showSummary = true;
      return;
    }

    this.loadingSummary = true;
    this.courseService.getSummary(this.course.id).subscribe({
      next: (res) => {
        this.summary = res;
        this.loadingSummary = false;
        this.showSummary = true;
      },
      error: () => {
        this.summary = 'Failed to load summary.';
        this.loadingSummary = false;
        this.showSummary = true;
      }
    });
  }

  get imageUrl(): string {
    if (!this.course.cover) return '/assets/images/default-course.jpg';
    if (this.course.cover.startsWith('http')) return this.course.cover;
    return `http://localhost:8082/images/${this.course.cover}`;
  }

  get videoUrl(): string {
    if (!this.course.video) return '';
    if (this.course.video.startsWith('http')) return this.course.video;
    return `http://localhost:8082/videos/${this.course.video}`;
  }
}
