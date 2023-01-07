import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddPromotionComponent } from 'src/app/popups/add-promotion/add-promotion.component';
import { EditPromotionComponent } from 'src/app/popups/edit-promotion/edit-promotion.component';
import { CommonService } from 'src/app/services/common.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
})
export class PromotionsComponent implements OnInit {
  promotions=[];

  constructor(private promotionService:PromotionService,private modalCtrl:ModalController,private alertController: AlertController,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getPromotions();
  }

  getPromotions(){
    this.promotionService.getPromotions({}).subscribe((res:any)=>{
      console.log(res);
      this.promotions=res.output.promotions
    })
  }


  async addPromotion() {
    const modal = await this.modalCtrl.create({
      component: AddPromotionComponent,
      cssClass:'add-product'
    });
    modal.present();    
  }

  async editPromotion(p) {
    const modal = await this.modalCtrl.create({
      component: EditPromotionComponent,
      componentProps:{
        promotion:p
      },
      cssClass:'add-product'
    });
    modal.present();    
  }

  async deletePromotion(p) {
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
            let body={id:p.id}
            this.commonService.showLoading()
            this.promotionService.deletePromotion(body).subscribe((res:any)=>{
              this.commonService.hideLoading()
              if(res.status=='OK'){
                this.commonService.successToast("Promotion Deleted Successfully");
              }else{
                this.commonService.errorToast("Promotion Deleting Failed")
              }
            },(err)=>{
              this.commonService.hideLoading()
              this.commonService.errorToast("Promotion Deleting Failed")
            })
          },
        },
      ],
    });

    await alert.present();
  }


}
