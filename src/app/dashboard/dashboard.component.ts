import { Component, OnInit } from '@angular/core';
import {Evento } from '../evento';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

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
      constructor(public auth: AuthService) {
    
      }

      logout() {
        this.auth.signOut();
      }
      
}
