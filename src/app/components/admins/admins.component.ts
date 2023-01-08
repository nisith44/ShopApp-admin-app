import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent implements OnInit {
  users=[];

  constructor(private userService:UserService,private modalCtrl:ModalController,private alertController: AlertController,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getUsers();
  }


  search(){
    let body={
      role:'admin',
    }
    this.userService.getAllUsers(body).subscribe((res:any)=>{
      console.log(res);
      this.users=res.output.users
    })
  }

  getUsers(){
    let body={
      role:'admin',
    }
    this.userService.getAllUsers(body).subscribe((res:any)=>{
      console.log(res);
      this.users=res.output.users
    })
  }

}
