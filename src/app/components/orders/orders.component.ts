import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ViewOrderComponent } from 'src/app/popups/view-order/view-order.component';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  page=1;
  orders=[];
  customerName=''

  constructor(private orderService:OrderService,private modalCtrl:ModalController,private alertController: AlertController,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getOrders();
  }

  changePage(e){
    this.page=e.page
    this.getOrders();
  }

  search(){
    this.page=1
    let body={
      page:this.page,
      limit:20,
      customerName:this.customerName
    }
    this.orderService.getOrders(body).subscribe((res:any)=>{
      console.log(res);
      this.orders=res.output.orders
    })
  }

  getOrders(){
    let body={
      page:this.page,
      limit:20
    }
    this.orderService.getOrders(body).subscribe((res:any)=>{
      console.log(res);
      this.orders=res.output.orders
    })
  }

  async viewOrder(o) {
    const modal = await this.modalCtrl.create({
      component: ViewOrderComponent,
      componentProps:{
        order:o
      },
      cssClass:'view-order'
    });
    modal.present();    
  }


}
