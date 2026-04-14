import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseFormCardComponent } from './course-form-card/course-form-card.component';
import { CourseService } from './services/course.service';

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseDetailComponent,
    CourseCardComponent,
    CourseFormCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoursesRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    CourseService
  ],
  exports: [
    CoursesListComponent,
    CourseCardComponent,
    CourseFormCardComponent
  ]
})
export class CoursesModule { }
