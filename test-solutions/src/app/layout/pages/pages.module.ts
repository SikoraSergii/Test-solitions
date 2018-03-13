import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { AdministrationComponent } from './administration/administration.component';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    UsersComponent,
    UserComponent,
    AdministrationComponent
  ]
})
export class PagesModule { }
