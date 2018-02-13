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
import { AppRoutingModule } from './/app-routing.module';
import { GrupoComponent } from './grupo/grupo.component';
import { GrupoDetailComponent } from './grupo-detail/grupo-detail.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import {AuthService} from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuardService } from './auth-guard.service';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EventoComponent,
    EventoDetailComponent,
    GrupoComponent,
    GrupoDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(), 
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
