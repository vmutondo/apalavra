import { Component, OnInit } from '@angular/core';
import { Evento } from '../evento';

import { EventoService } from '../evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  eventos: Evento[];
  evento: any = {};
  selectedEvento: Evento;
  eventonovo: any = {
    titulo: '',
    descricao: '',
    data: '',
    imagem: '',
  };
  item;
  constructor(private eventoService: EventoService) {

  }

  ngOnInit() {
    this.getEventos();
  }

  onSelect(evento: Evento): void {
    this.selectedEvento = evento;

  }

  getEventos(): void {
    this.eventoService.getEventos().subscribe(eventos => this.eventos = eventos);
    console.log(this.eventos);
  }

  editar(evento) {
    this.eventonovo = evento;

    // console.log(this.eventonovos);
  }

  deletar(evento) {
    console.log("Evento: " + evento.titulo + " Deletado");
  }


  adicionar(evento) {
  //   for (this.item in this.eventos) {
  //     if (this.item == evento) {
  //       console.log(this.item.titulo, " Updated!");
  //       return false;
  //     }
  //   }
    // this.eventos.forEach(element => {
    //   if (element == evento) {
    //     console.log(element.titulo, " Updated!");
    //     return false
    //   }

    // });
    // console.log(evento, " Adicionado!!");
    // this.clean();
  }

  clean() {
    this.eventonovo = {
      titulo: '',
      descricao: '',
      data: '',
      imagem: '',
    };
  }
}
