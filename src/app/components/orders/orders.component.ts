import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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

  constructor(private orderService:OrderService,private modalCtrl:ModalController,private alertController: AlertController,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getOrders();
  }

  changePage(e){
    this.page=e.page
    this.getOrders();
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
}
