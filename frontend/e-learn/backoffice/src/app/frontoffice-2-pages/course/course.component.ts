import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoursService } from '../../services/cours.service';
import { Cours } from '../../models/cours.model';

@Component({
  selector: 'app-frontoffice-2-course-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseFrontoffice2PageComponent implements OnInit {
  courses: Cours[] = [];
  selectedCourse: Cours = {};
  isEditing = false;

  constructor(private coursService: CoursService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursService.getAllCours().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error('Error loading courses', err)
    });
  }

  editCourse(course: Cours): void {
    this.selectedCourse = { ...course };
    this.isEditing = true;
  }

  deleteCourse(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this course?')) {
      this.coursService.deleteCours(id).subscribe({
        next: () => this.loadCourses(),
        error: (err) => console.error('Error deleting course', err)
      });
    }
  }

  saveCourse(): void {
    if (this.isEditing && this.selectedCourse.id) {
      this.coursService.updateCours(this.selectedCourse.id, this.selectedCourse).subscribe({
        next: () => {
          this.loadCourses();
          this.resetForm();
        },
        error: (err) => console.error('Error updating course', err)
      });
    } else {
      this.coursService.createCours(this.selectedCourse).subscribe({
        next: () => {
          this.loadCourses();
          this.resetForm();
        },
        error: (err) => console.error('Error creating course', err)
      });
    }
  }

  resetForm(): void {
    this.selectedCourse = {};
    this.isEditing = false;
  }
}
