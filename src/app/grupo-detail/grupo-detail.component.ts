import { Component, OnInit, Input } from '@angular/core';
import { Grupo} from '../grupo';

@Component({
  selector: 'app-grupo-detail',
  templateUrl: './grupo-detail.component.html',
  styleUrls: ['./grupo-detail.component.css']
})
export class GrupoDetailComponent implements OnInit {

  @Input() grupo:Grupo;
  constructor() { }


  ngOnInit() {
  }

}
