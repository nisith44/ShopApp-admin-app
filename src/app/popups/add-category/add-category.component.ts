import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(private modalCtrl:ModalController,private productService:ProductService,
    private commonService: CommonService,private formBuilder:FormBuilder) {
      this.categoryForm = this.formBuilder.group({
        "name": new FormControl('', [Validators.required]),
      });
     }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }

  submit(){
    if(this.categoryForm.valid){
      let body={
        name:this.categoryForm.value.name,
      }
      this.commonService.showLoading();
      this.productService.addCategory(body).subscribe((res:any)=>{
        this.commonService.hideLoading()
        if(res.status=='OK'){
          this.commonService.successToast("Category Added Successfully");
          this.close();
        }else{
          this.commonService.errorToast("Category Adding Failed")
        }
      },(err)=>{
        this.commonService.hideLoading()
        this.commonService.errorToast("Category Adding Failed")
      })
    }
  }

}
