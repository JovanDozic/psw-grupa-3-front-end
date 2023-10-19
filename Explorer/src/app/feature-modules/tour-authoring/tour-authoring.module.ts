import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointsComponent } from './points/points.component';
import { PointsFormComponent } from './points-form/points-form.component';
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextFieldModule} from "@angular/cdk/text-field";
import { TourReviewFormComponent } from './tour-review-form/tour-review-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { TourComponent } from './tour/tour.component';
import { TourFormComponent } from './tour-form/tour-form.component';



@NgModule({
  declarations: [
    PointsComponent,
    PointsFormComponent
    TourReviewFormComponent,
    TourComponent,
    TourFormComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatRadioModule
  ],
  exports: [
    PointsComponent,
    PointsFormComponent,
    TourComponent,
    TourFormComponent,
    TourReviewFormComponent
  ]
})
export class TourAuthoringModule { }
