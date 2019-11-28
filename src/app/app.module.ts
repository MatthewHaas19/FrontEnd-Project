import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule,
         MatFormFieldModule,
         MatInputModule,
         MatSelectModule,
         MatButtonModule} from '@angular/material';
import { FormComponent } from './form/form.component';
import { FormService } from '../form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultComponent } from './result/result.component';
import {RouterModule, Routes} from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  { path: 'result', component: ResultComponent},
  { path: '', component: FormComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: 'not-found'}
]


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ResultComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
