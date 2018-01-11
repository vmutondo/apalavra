import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoComponent} from './evento/evento.component';
import {EventoDetailComponent} from './evento-detail/evento-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {path:'inicio', component:DashboardComponent},
  {path: 'eventos', component:EventoComponent},
  {path: 'eventos-detalhe', component:EventoDetailComponent}
  
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
