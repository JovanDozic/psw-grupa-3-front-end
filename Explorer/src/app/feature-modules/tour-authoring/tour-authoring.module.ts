import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointsComponent } from './points/points.component';
import { PointsFormComponent } from './points-form/points-form.component';
import {MatButtonModule} from "@angular/material/button";
import {MaterialModule} from "../../infrastructure/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextFieldModule} from "@angular/cdk/text-field";



@NgModule({
  declarations: [
    PointsComponent,
    PointsFormComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule
  ],
  exports: [
    PointsComponent,
    PointsFormComponent
  ]
})
export class TourAuthoringModule { }
