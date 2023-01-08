import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  img;
  productForm: FormGroup;
  isVariations=false
  variationName;
  variationType;
  variationPrice;
  variations=[]
  @Input() product;
  categories=[];

  constructor(private modalCtrl:ModalController,private productService:ProductService,
    private commonService: CommonService,private formBuilder:FormBuilder) {
      this.productForm = this.formBuilder.group({
        "title": new FormControl('', [Validators.required]),
        "description": new FormControl('', [Validators.required]),
        "category": new FormControl('', [Validators.required]),
        "price": new FormControl('', [Validators.required]),
      });
     }

  ngOnInit() {
    console.log(this.product);
    this.autoFillData();
    this.getCategory();
  }

  getCategory() {
    this.commonService.showLoading();
    this.productService.getCategories().subscribe((res: any) => {
      this.commonService.hideLoading()
      if (res.status == 'OK') {
        this.categories=res.output.categories
      } else {
        this.commonService.errorToast("Getting Categories Failed")
      }
    }, (err) => {
      this.commonService.hideLoading()
      this.commonService.errorToast("Getting Categories Failed")
    })
  }

  autoFillData(){
    this.productForm.patchValue(this.product);
    this.img=this.product.img;
    if(this.product.variation){
      this.isVariations=true
      this.variations=this.product.variation.variations;
      this.variationName=this.product.variation.name
    }else{
      this.isVariations=false
    }
  }

  close(){
    this.modalCtrl.dismiss();
  }

  imgChange(e){
    let body=new FormData()
    body.append('img',e.target.files[0]);
    this.commonService.showLoading()
    this.productService.uploadProductImg(body).subscribe((res:any)=>{
      this.commonService.hideLoading();
      console.log(res);
      this.img=res.output.filePath
    },(err)=>{
      this.commonService.hideLoading();
    })
  }

  submit(){
    if(this.productForm.valid && this.img){
      let body={
        id:this.product.product_id,
        title:this.productForm.value.title,
        description:this.productForm.value.description,
        category:this.productForm.value.category,
        price:this.productForm.value.price,
        img:this.img,
      }
      if(this.isVariations){
        let variation={
          name:this.variationName,
          variations:this.variations
        }
        body['variation']=variation
      }
      this.commonService.showLoading();
      this.productService.EditProduct(body).subscribe((res:any)=>{
        this.commonService.hideLoading()
        if(res.status=='OK'){
          this.commonService.successToast("Product Updated Successfully");
          this.modalCtrl.dismiss({
            refresh:true
          })
        }else{
          this.commonService.errorToast("Product Updating Failed")
        }
      },(err)=>{
        this.commonService.hideLoading()
        this.commonService.errorToast("Product Updating Failed")
      })
    }
  }

  addvariation(){
    this.variations.push({
      value:this.variationType,
      price:this.variationPrice
    })
    this.variationType="";this.variationPrice="";
  }

  removeVariation(i){
    this.variations.splice(i,1)
  }


}
