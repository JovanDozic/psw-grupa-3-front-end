import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PositionSimulatorComponent} from "./position-simulator/position-simulator.component";
import {MatButtonModule} from "@angular/material/button";
import {MaterialModule} from "../../infrastructure/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextFieldModule} from "@angular/cdk/text-field";
import {MatRadioModule} from "@angular/material/radio";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {LayoutModule} from "../layout/layout.module";

@NgModule({
  declarations: [
    PositionSimulatorComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatRadioModule,
    RouterModule,
    SharedModule,
    LayoutModule
  ],
  exports: [
    PositionSimulatorComponent
  ]
})
export class TourExecutionModule { }
