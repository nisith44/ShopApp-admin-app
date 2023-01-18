import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  userData;
  constructor(private router:Router) {}

  ngOnInit(): void {
    this.userData=JSON.parse(sessionStorage.getItem("userData"));
    console.log(this.userData);
  }

  gotoProfile(){
    this.router.navigate(['home/profile'])
  }

  logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userData");
    this.router.navigate(['login'])
  }


}
