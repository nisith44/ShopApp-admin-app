import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  @Input() order;
  drivers=[]

  constructor(private modalCtrl:ModalController,private orderService:OrderService,
    private commonService: CommonService,private formBuilder:FormBuilder,private userService:UserService) { }

  ngOnInit() {
    console.log(this.order);
    this.getDrivers()
  }

  getDrivers(){
    this.userService.getAllDrivers().subscribe((res:any)=>{
      this.drivers=res.output.drivers;
      console.log(this.drivers);
    })
  }

  close(){
    this.modalCtrl.dismiss();
  }

  statusChange(e){
    let body={
      id:this.order.order_id,
      status:e.target.value
    }
    this.commonService.showLoading();
    this.orderService.updateStatus(body).subscribe((res:any)=>{
      this.commonService.hideLoading()
        if(res.status=='OK'){
          this.commonService.successToast("Order Status Changed Successfully");
        }else{
          this.commonService.errorToast("Order Updating Failed")
        }
    },(err)=>{
      this.commonService.hideLoading()
      this.commonService.errorToast("Order Updating Failed")
    })
  }

}
