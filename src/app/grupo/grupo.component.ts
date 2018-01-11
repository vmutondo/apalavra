import { Component, OnInit } from '@angular/core';
import {Grupo} from '../grupo';
import {GrupoService} from '../grupo.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  grupos:Grupo[];
  grupo:any = {"nomeLider":""}
  selectedGrupo:Grupo;
  
  constructor(private grupoService:GrupoService) { }

  ngOnInit() {
    this.getGrupos();
  }
  onSelect(grupo:Grupo):void {
    this.selectedGrupo = grupo;
  }

  getGrupos():void {
    this.grupoService.getGrupos().subscribe(grupos=>this.grupos = grupos);
  }

}
