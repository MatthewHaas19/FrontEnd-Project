import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormReducer } from './reducers/form.reducer'
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule,
         MatFormFieldModule,
         MatInputModule,
         MatSnackBarModule,
         MatSelectModule,
         MatSliderModule,
         MatIconModule,
         MatButtonModule} from '@angular/material';
import { FormComponent } from './form/form.component';
import { FormService } from '../form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultComponent } from './result/result.component';
import {RouterModule, Routes} from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ResultComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSliderModule,
    AppRoutingModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    StoreModule.forRoot({results: FormReducer})
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
