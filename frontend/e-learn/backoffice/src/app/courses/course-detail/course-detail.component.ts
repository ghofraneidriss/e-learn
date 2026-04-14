import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  standalone: false
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  loading = false;
  error = '';

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCourse(+id);
    }
  }

  loadCourse(id: number): void {
    this.loading = true;
    this.courseService.getCourseById(id).subscribe({
      next: (data) => {
        this.course = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load course details.';
        this.loading = false;
      }
    });
  }

  get imageUrl(): string {
    if (!this.course?.cover) return '/assets/images/default-course.jpg';
    if (this.course.cover.startsWith('http')) return this.course.cover;
    return `http://localhost:8082/images/${this.course.cover}`;
  }

  get videoUrl(): string {
    if (!this.course?.video) return '';
    if (this.course.video.startsWith('http')) return this.course.video;
    return `http://localhost:8082/videos/${this.course.video}`;
  }
}
