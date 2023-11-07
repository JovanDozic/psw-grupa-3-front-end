import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferenceFormComponent } from './preference-form/preference-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { PreferenceComponent } from './preference/preference.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { LayoutModule } from "../layout/layout.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchFormComponent } from '../layout/home/search-form/search-form.component';


@NgModule({
  declarations: [
    PreferenceFormComponent,
    PreferenceComponent,
    ShoppingCartComponent,
    SearchResultsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSelectModule,
    LayoutModule,
    NgbModule,
  ],
  exports: [
    PreferenceFormComponent,
    PreferenceComponent,
    ShoppingCartComponent,
    SearchFormComponent,
    SearchResultsComponent,
  ]
})
export class MarketplaceModule { }