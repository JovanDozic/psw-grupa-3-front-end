import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemFormComponent } from './problem-form/problem-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TourComponent } from './tour/tour.component';

@NgModule({
  declarations: [
    ProblemFormComponent,
    TourComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ProblemFormComponent,
    TourComponent,
  ]
})
export class TourAuthoringModule { }
