import { Component, Input } from '@angular/core';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  standalone: false
})
export class CourseCardComponent {
  @Input() course!: Course;
}
