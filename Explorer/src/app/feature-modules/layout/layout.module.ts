import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { RatingsComponent } from './ratings/ratings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    RatingsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    NavbarComponent,
    HomeComponent,
    RatingsComponent
  ]
})
export class LayoutModule { }
