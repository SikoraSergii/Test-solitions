import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { LayoutModule } from './layout/layout.module';
import { NotAuthGuard } from './shared/not-auth-guard';
import { AuthGuard } from './shared/auth-guard ';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule,
    LayoutModule
    
  ],
  providers: [AuthService, NotAuthGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
