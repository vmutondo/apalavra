import { Component, OnInit } from '@angular/core';
import {Evento } from '../evento';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    
  }
    eventos:Evento[];
    evento:any = {"titulo":""}
    selectedEvento:Evento;
      constructor(private eventoService: EventoService) {
    
      }
      
}
