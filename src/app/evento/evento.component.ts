import { Component, OnInit } from '@angular/core';
import { Evento } from '../evento';

import { EventoService} from '../evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

eventos:Evento[];
evento:any = {"titulo":""}
selectedEvento:Evento;
  constructor(private eventoService: EventoService) {

   }

  ngOnInit() {
  this.getEventos();
  }

  onSelect(evento:Evento): void{
    this.selectedEvento = evento;

  }

  getEventos(): void {
    this.eventoService.getEventos().subscribe(eventos => this.eventos = eventos);
  }

}
