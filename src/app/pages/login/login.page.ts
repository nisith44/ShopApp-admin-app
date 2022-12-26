import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder:FormBuilder,private userService:UserService,
    private commonService:CommonService,private router:Router) {
    this.loginForm = this.formBuilder.group({
      "username": new FormControl('', [Validators.required,Validators.email]),
      "password": new FormControl('', [Validators.required]),
    });
   }

  ngOnInit() {
  }

  login(){ 
    if(this.loginForm.valid){
      let body={
        username:this.loginForm.value.username,
        password:this.loginForm.value.password
      }
      this.commonService.showLoading()
      this.userService.login(body).subscribe((res:any)=>{
        this.commonService.hideLoading();
        console.log(res);
        if(res.status=='OK'){
          this.router.navigate(['home'])
          sessionStorage.setItem('token',res.output.token)
          sessionStorage.setItem('userData',JSON.stringify(res.output.userData))
          this.commonService.successToast("Successfully Logged In");
        }else{
          this.commonService.errorToast("Username Or Password Incorrect")
        }
      },(err)=>{
        this.commonService.hideLoading();
        this.commonService.errorToast("Login Failed")
      })
    }
  }

}
