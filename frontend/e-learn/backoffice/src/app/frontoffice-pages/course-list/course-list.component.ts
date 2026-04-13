import { Component } from '@angular/core';
import { CoursesModule } from '../../courses/courses.module';

@Component({
  selector: 'app-frontoffice-course-list-page',
  standalone: true,
  imports: [CoursesModule],
  template: `<app-courses-list></app-courses-list>`,
  styleUrl: './course-list.component.css'
})
export class CourseListFrontofficePageComponent {}
