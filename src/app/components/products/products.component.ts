import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddProductComponent } from 'src/app/popups/add-product/add-product.component';
import { EditProductComponent } from 'src/app/popups/edit-product/edit-product.component';
import { CommonService } from 'src/app/services/common.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products=[ ];
  page=1;
  title=''

  constructor(private productService:ProductService,private modalCtrl:ModalController,private alertController: AlertController,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getProducts();
  }

  changePage(e){
    this.page=e.page
    this.getProducts();
  }

  search(){
    this.page=1
    let body={
      page:this.page,
      limit:20,
      title:this.title
    }
    this.productService.getProducts(body).subscribe((res:any)=>{
      console.log(res);
      this.products=res.output.products
    })
  }


  getProducts(){
    let body={
      page:this.page,
      limit:20
    }
    this.productService.getProducts(body).subscribe((res:any)=>{
      console.log(res);
      this.products=res.output.products
    })
  }

  async addProduct() {
    const modal = await this.modalCtrl.create({
      component: AddProductComponent,
      cssClass:'add-product'
    });
    modal.present();    
  }

  async editProduct(product) {
    const modal = await this.modalCtrl.create({
      component: EditProductComponent,
      componentProps:{
        product:product
      },
      cssClass:'add-product'
    });
    modal.present();   
    modal.onDidDismiss().then((res:any)=>{
      if(res.data.refresh){this.getProducts()}
    }) 
  }

  async deleteProduct(p) {
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
            let body={id:p.product_id}
            this.commonService.showLoading()
            this.productService.deleteProduct(body).subscribe((res:any)=>{
              this.commonService.hideLoading()
              if(res.status=='OK'){
                this.getProducts();
                this.commonService.successToast("Product Deleted Successfully");
              }else{
                this.commonService.errorToast("Product Deleting Failed")
              }
            },(err)=>{
              this.commonService.hideLoading()
              this.commonService.errorToast("Product Deleting Failed")
            })
          },
        },
      ],
    });

    await alert.present();
  }


}
