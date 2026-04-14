import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReclamationRoutingModule } from './reclamation-routing.module';
import { ReclamationListComponent } from './reclamation-list/reclamation-list.component';
import { ReclamationFormComponent } from './reclamation-form/reclamation-form.component';

@NgModule({
  declarations: [
    ReclamationListComponent,
    ReclamationFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ReclamationRoutingModule
  ]
})
export class ReclamationModule { }
