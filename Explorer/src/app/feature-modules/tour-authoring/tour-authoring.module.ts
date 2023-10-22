import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourReviewFormComponent } from './tour-review-form/tour-review-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { TourComponent } from './tour/tour.component';
import { TourFormComponent } from './tour-form/tour-form.component';
import { ClubComponent } from './club/club.component';
import { ClubFormComponent } from './club-form/club-form.component';



@NgModule({
  declarations: [
    TourReviewFormComponent,
    TourComponent,
    TourFormComponent,
    ClubComponent,
    ClubFormComponent
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
    TourReviewFormComponent, 
    ClubComponent,
    ClubFormComponent
  ]
})
export class TourAuthoringModule { }
