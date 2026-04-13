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
  summary: string = '';
  loading: boolean = true;
  errorMsg: string = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const courseId = Number(idParam);
      this.fetchCourseDetails(courseId);
    } else {
      this.errorMsg = 'Invalid course ID.';
      this.loading = false;
    }
  }

  fetchCourseDetails(id: number): void {
    this.loading = true;
    this.courseService.getCourseById(id).subscribe({
      next: (data) => {
        this.course = data;
        this.loading = false;
        this.fetchSummary(id);
      },
      error: (err) => {
        this.errorMsg = 'Failed to load course details. Please try again.';
        this.loading = false;
        console.error('Error fetching course', err);
      }
    });
  }

  fetchSummary(id: number): void {
    this.courseService.getSummary(id).subscribe({
      next: (data) => {
        this.summary = data;
      },
      error: (err) => {
        console.error('Error fetching summary', err);
      }
    });
  }
}
