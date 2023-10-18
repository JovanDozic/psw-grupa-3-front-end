import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointsComponent } from './points/points.component';



@NgModule({
  declarations: [
    PointsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PointsComponent
  ]
})
export class TourAuthoringModule { }
