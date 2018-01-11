import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Component } from '@angular/core/src/metadata/directives';
import { EventoComponent } from './evento/evento.component';
import { FormsModule } from '@angular/forms';
import { EventoDetailComponent } from './evento-detail/evento-detail.component'; // <-- NgModel lives here
import {EventoService} from './evento.service';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EventoComponent,
    EventoDetailComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    EventoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
