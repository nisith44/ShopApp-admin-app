import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  userData: any;

  constructor(private commonService: CommonService,private formBuilder:FormBuilder,
    private userService:UserService) {
    this.userForm = this.formBuilder.group({
      "email": new FormControl('', [Validators.required,Validators.email]),
      "name": new FormControl('', [Validators.required]),
      "role": new FormControl('', [Validators.required]),
      "address": new FormControl('', [Validators.required]),
      "phone": new FormControl('', [Validators.required]),
    });
   }

  ngOnInit() {
    this.userData=JSON.parse(sessionStorage.getItem("userData"));
    this.userForm.patchValue(this.userData)
  }

  submit(){
    if(this.userForm.valid){
      let body={
        email:this.userForm.value.email,
        name:this.userForm.value.name,
        role:this.userForm.value.role,
        address:this.userForm.value.address,
        phone:this.userForm.value.phone,
      }
      this.commonService.showLoading();
      this.userService.updateAdminAccount(body).subscribe((res:any)=>{
        this.commonService.hideLoading()
        if(res.status=='OK'){
          this.commonService.successToast("Account Updated Successfully");
        }else{
          this.commonService.errorToast(res.message || "Account Updating Failed")
        }
      },(err)=>{
        this.commonService.hideLoading()
        this.commonService.errorToast("Account Updating Failed")
      })
    }
  }

}
