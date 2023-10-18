import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourReviewFormComponent } from './tour-review-form/tour-review-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';



@NgModule({
  declarations: [
    TourReviewFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  exports: [
    TourReviewFormComponent
  ]
})
export class TourAuthoringModule { }
