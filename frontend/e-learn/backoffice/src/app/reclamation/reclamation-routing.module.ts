import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReclamationFormComponent } from './reclamation-form/reclamation-form.component';

const routes: Routes = [
  { path: '', component: ReclamationFormComponent },
  { path: 'new', component: ReclamationFormComponent },
  { path: 'edit/:id', component: ReclamationFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationRoutingModule { }
