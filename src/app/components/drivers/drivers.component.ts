import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddUserComponent } from 'src/app/popups/add-user/add-user.component';
import { EditUserComponent } from 'src/app/popups/edit-user/edit-user.component';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
})
export class DriversComponent implements OnInit {
  users=[];

  constructor(private userService:UserService,private modalCtrl:ModalController,private alertController: AlertController,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getUsers();
  }


  search(){
    let body={
      role:'driver',
    }
    this.userService.getAllUsers(body).subscribe((res:any)=>{
      console.log(res);
      this.users=res.output.users
    })
  }

  getUsers(){
    let body={
      role:'driver',
    }
    this.userService.getAllUsers(body).subscribe((res:any)=>{
      console.log(res);
      this.users=res.output.users
    })
  }

  async addUser(){
    const modal = await this.modalCtrl.create({
      component: AddUserComponent,
      cssClass:'add-product',
      componentProps:{
        role:"driver"
      }
    });
    modal.present();  
  }

  async editUser(u){
    const modal = await this.modalCtrl.create({
      component: EditUserComponent,
      cssClass:'add-product',
      componentProps:{
        user:u
      }
    });
    modal.present();  
  }

  async deleteUser(u) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message:'Are You Sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'confirm',
          handler: () => {
            let body={id:u.id}
            this.commonService.showLoading()
            this.userService.deleteUser(body).subscribe((res:any)=>{
              this.commonService.hideLoading()
              if(res.status=='OK'){
                this.commonService.successToast("User Deleted Successfully");
              }else{
                this.commonService.errorToast(res.message || "User Deleting Failed")
              }
            },(err)=>{
              this.commonService.hideLoading()
              this.commonService.errorToast("User Deleting Failed")
            })
          },
        },
      ],
    });

    await alert.present();
  }

}
