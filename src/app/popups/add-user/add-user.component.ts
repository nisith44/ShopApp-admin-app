import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  @Input() role;

  constructor(private modalCtrl:ModalController,private commonService: CommonService,private formBuilder:FormBuilder,
    private userService:UserService) {
    this.userForm = this.formBuilder.group({
      "email": new FormControl('', [Validators.required,Validators.email]),
      "password": new FormControl('', [Validators.required]),
      "name": new FormControl('', [Validators.required]),
      "role": new FormControl('', [Validators.required]),
      "address": new FormControl('', [Validators.required]),
      "phone": new FormControl('', [Validators.required]),
    });
   }

  ngOnInit() {
    this.userForm.patchValue({role:this.role})
  }

  close(){
    this.modalCtrl.dismiss();
  }

  submit(){
    if(this.userForm.valid){
      let body={
        email:this.userForm.value.email,
        password:this.userForm.value.password,
        name:this.userForm.value.name,
        role:this.userForm.value.role,
        address:this.userForm.value.address,
        phone:this.userForm.value.phone,
      }
      this.commonService.showLoading();
      this.userService.addUser(body).subscribe((res:any)=>{
        this.commonService.hideLoading()
        if(res.status=='OK'){
          this.commonService.successToast("User Added Successfully");
          this.close();
        }else{
          this.commonService.errorToast(res.message || "User Adding Failed")
        }
      },(err)=>{
        this.commonService.hideLoading()
        this.commonService.errorToast("User Adding Failed")
      })
    }
  }

}
