import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ActivateAccountComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    ActivateAccountComponent
  ]
})
export class AuthModule { }
