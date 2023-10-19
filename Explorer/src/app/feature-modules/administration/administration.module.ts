import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRatingFormComponent } from './app-rating-form/app-rating-form.component';
import { AppRatingsComponent } from './app-ratings/app-ratings.component';
import { EquipmentRecordComponent } from './equipment-record/equipment-record.component';



@NgModule({
  declarations: [
    EquipmentFormComponent,
    EquipmentComponent,
    AppRatingFormComponent,
    AppRatingsComponent,
    EquipmentRecordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    EquipmentComponent,
    EquipmentFormComponent,
    EquipmentRecordComponent,
    AppRatingsComponent,
    AppRatingFormComponent,
  ]
})
export class AdministrationModule { }
