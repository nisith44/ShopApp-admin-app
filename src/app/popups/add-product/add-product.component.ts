import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  img;
  productForm: FormGroup;
  isVariations=false
  variationName;
  variationType;
  variationPrice;
  variations=[]
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
      this.productService.addProduct(body).subscribe((res:any)=>{
        this.commonService.hideLoading()
        if(res.status=='OK'){
          this.commonService.successToast("Product Added Successfully");
          this.close();
        }else{
          this.commonService.errorToast("Product Adding Failed")
        }
      },(err)=>{
        this.commonService.hideLoading()
        this.commonService.errorToast("Product Adding Failed")
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
