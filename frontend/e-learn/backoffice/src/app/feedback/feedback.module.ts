import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';

@NgModule({
  declarations: [
    FeedbackListComponent,
    FeedbackFormComponent,
    FeedbackDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FeedbackRoutingModule
  ]
})
export class FeedbackModule { }
