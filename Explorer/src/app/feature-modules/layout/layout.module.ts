import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './home/search/search.component';
import { FormsModule } from '@angular/forms';
import { RecommendedToursComponent } from './recommended-tours/recommended-tours.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SearchComponent,
    RecommendedToursComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    NgbModule,
  ],
  exports: [
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    RecommendedToursComponent,
  ]
})
export class LayoutModule { }
