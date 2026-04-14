import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  standalone: false
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  topCourses: Course[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.fetchTopCourses();
    this.fetchAllCourses();
  }

  fetchTopCourses(): void {
    this.courseService.getTopCourses().subscribe({
      next: (data) => {
        this.topCourses = (data || []).slice(0, 5);
      },
      error: (err) => {
        console.error('Failed to fetch top courses', err);
      }
    });
  }

  fetchAllCourses(): void {
    this.loading = true;
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data || [];
        this.loading = false;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Failed to load courses. Please check if the backend is running.';
        this.loading = false;
        console.error('Failed to fetch all courses', err);
      }
    });
  }

  onCourseCreated() {
    this.refreshData();
  }
}
