import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Evento } from './evento';
import { EVENTOS} from './test-eventos';

@Injectable()
export class EventoService {


  constructor() { }


  getEventos(): Observable<Evento[]> {
    return of(EVENTOS);
  }
}

