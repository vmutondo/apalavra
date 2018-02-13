import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoComponent} from './evento/evento.component';
import {EventoDetailComponent} from './evento-detail/evento-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {GrupoComponent } from './grupo/grupo.component';
import {GrupoDetailComponent} from './grupo-detail/grupo-detail.component';
import { LoginComponent} from './login/login.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'inicio', component:DashboardComponent},
  {path: 'eventos', component:EventoComponent},
  {path: 'grupos', component:GrupoComponent},
  {path: 'login', component:LoginComponent}

  
  
//canActivate: [AuthGuardService]
  
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule,
  ],
  providers:[
    AuthGuardService
  ]
})
export class AppRoutingModule { }
