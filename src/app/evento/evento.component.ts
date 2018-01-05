import { Component, OnInit } from '@angular/core';
import { Evento } from '../evento';
import {EVENTOS} from '../test-eventos';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

eventos:any;
evento:any = {"titulo":""}
  constructor() { }

  ngOnInit() {
  this.eventos = EVENTOS;
    
    console.log(this.eventos)
  }

}
