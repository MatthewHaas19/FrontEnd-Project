import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResultComponent } from './result/result.component';
import { FormComponent } from './form/form.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', component: FormComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: 'error', component: ErrorComponent},
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
