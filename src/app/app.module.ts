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
import { GrupoComponent } from './grupo/grupo.component';
import { GrupoDetailComponent } from './grupo-detail/grupo-detail.component';
import {GrupoService } from './grupo.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EventoComponent,
    EventoDetailComponent,
    GrupoComponent,
    GrupoDetailComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    EventoService,GrupoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
