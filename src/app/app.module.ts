import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Component } from '@angular/core/src/metadata/directives';
import { EventoComponent } from './evento/evento.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EventoComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
