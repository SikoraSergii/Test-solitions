import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../shared/material.module';
import { LayoutComponent } from './layout.component';
import { PagesModule } from './pages/pages.module';
import { UsersService } from './shared/users.service';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PagesModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [LayoutComponent, ToolbarComponent],
  providers: [UsersService]
})
export class LayoutModule { }
