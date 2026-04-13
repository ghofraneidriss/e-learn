import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseService } from './services/course.service';

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseDetailComponent,
    CourseCardComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    HttpClientModule
  ],
  providers: [
    CourseService
  ]
  ,
  exports: [
    CoursesListComponent,
    CourseCardComponent
  ]
})
export class CoursesModule { }
