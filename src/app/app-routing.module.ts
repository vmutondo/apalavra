import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoComponent} from './evento/evento.component';
import {EventoDetailComponent} from './evento-detail/evento-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {GrupoComponent } from './grupo/grupo.component';
import {GrupoDetailComponent} from './grupo-detail/grupo-detail.component';
import { LoginComponent} from './login/login.component'

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {path:'inicio', component:DashboardComponent},
  {path: 'eventos', component:EventoComponent},
  {path: 'eventos-detalhe', component: EventoDetailComponent},
  {path: 'grupos', component:GrupoComponent},
  {path: 'grupos-detalhe', component:GrupoDetailComponent},
  {path: 'login', component:LoginComponent},
  
  

  
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
