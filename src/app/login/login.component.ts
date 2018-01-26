import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user:any = {}
  constructor() { }

  ngOnInit() {
  }

// =================================================
//  Login 
// =================================================
  login(user:any){
    alert(user.name )
  }
  // =================================================


// =================================================
//  CreateAccount
// =================================================
  createAccount(){
    alert("create account" )
  }
  // =================================================



// =================================================
//  Login with social network
// =================================================
  loginSocial(item){
    alert(item )
  }
  // =================================================



// =================================================
//  CreateAccount
// =================================================
  closeComponent(){
    alert("closing" )
  }
  // =================================================
}
