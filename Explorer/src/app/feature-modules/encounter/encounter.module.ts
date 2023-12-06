import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiddenEncounterFormComponent } from './hidden-encounter-form/hidden-encounter-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HiddenEncounterFormComponent
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    TextFieldModule,
    MatRadioModule,
    RouterModule,
    SharedModule
  ]
})
export class EncounterModule { }
