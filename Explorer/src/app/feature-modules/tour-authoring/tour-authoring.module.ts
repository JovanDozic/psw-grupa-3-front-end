import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourReviewFormComponent } from './tour-review-form/tour-review-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { TourComponent } from './tour/tour.component';
import { TourFormComponent } from './tour-form/tour-form.component';



@NgModule({
  declarations: [
    TourReviewFormComponent,
    TourComponent,
    TourFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  exports: [
    TourComponent,
    TourFormComponent,
    TourReviewFormComponent
  ]
})
export class TourAuthoringModule { }
