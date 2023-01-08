import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ViewOrderComponent } from 'src/app/popups/view-order/view-order.component';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardData: any;
  todayEarnings=0
  monthEarnings: number;

  constructor(private orderService:OrderService,private modalCtrl:ModalController,private alertController: AlertController,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getAdminDashboard().subscribe((res:any)=>{
      console.log(res);
      this.dashboardData=res.output

      this.todayEarnings=0
      this.dashboardData.todayOrders.forEach(order => {
        this.todayEarnings=this.todayEarnings+order.total
      });

      this.monthEarnings=0
      this.dashboardData.monthOrders.forEach(order => {
        this.monthEarnings=this.monthEarnings+order.total
      });
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
