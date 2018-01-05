import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  user:any = {};
  visible:boolean = false;

  closelogin(){
      alert("close")
  }

  // Create account with email
  createAccount(user){
      console.log(user);
      alert("Email: "+user.name + "\nPassword: " + user.password1)
  }

  back(){
      this.visible = !this.visible;
      

  }
  next(){
      this.visible = !this.visible;
  }

  finish(){
      alert("Calm down,Why are you running!!")
  }

}
