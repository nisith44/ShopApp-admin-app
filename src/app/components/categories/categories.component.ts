import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddCategoryComponent } from 'src/app/popups/add-category/add-category.component';
import { CommonService } from 'src/app/services/common.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories=[];

  constructor(private productService:ProductService,private modalCtrl:ModalController,private alertController: AlertController,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.productService.getCategories().subscribe((res:any)=>{
      console.log(res);
      this.categories=res.output.categories
    })
  }

  async addCategory(){
    const modal = await this.modalCtrl.create({
      component: AddCategoryComponent,
      cssClass:'add-product'
    });
    modal.present();  
  }

  async deleteCategory(c) {
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
            let body={id:c.category_id}
            this.commonService.showLoading()
            this.productService.deleteCategory(body).subscribe((res:any)=>{
              this.commonService.hideLoading()
              if(res.status=='OK'){
                this.commonService.successToast("Category Deleted Successfully");
              }else{
                this.commonService.errorToast("Category Deleting Failed")
              }
            },(err)=>{
              this.commonService.hideLoading()
              this.commonService.errorToast("Category Deleting Failed")
            })
          },
        },
      ],
    });

    await alert.present();
  }

}
