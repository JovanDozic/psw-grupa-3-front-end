import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferenceFormComponent } from './preference-form/preference-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { PreferenceComponent } from './preference/preference.component';


@NgModule({
  declarations: [
    PreferenceFormComponent,
    PreferenceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports:[
    PreferenceFormComponent,
  ]
})
export class MarketplaceModule { }
