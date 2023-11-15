import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferenceFormComponent } from './preference-form/preference-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { PreferenceComponent } from './preference/preference.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchFormComponent } from './search-form/search-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PreferenceFormComponent,
    PreferenceComponent,
    ShoppingCartComponent,
    SearchResultsComponent,
    SearchFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgbModule,
    SharedModule,
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