import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RegistrationRoutingModule } from './registration-routing.module';

import { RegistrationComponent } from './registration.component';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    RegistrationComponent
  ]
})
export class RegistrationModule { }
