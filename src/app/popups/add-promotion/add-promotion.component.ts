import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.scss'],
})
export class AddPromotionComponent implements OnInit {
  promotionForm: FormGroup;
  img: any;

  constructor(private modalCtrl:ModalController,private commonService: CommonService,private formBuilder:FormBuilder,
    private promotionService:PromotionService) {
    this.promotionForm = this.formBuilder.group({
      "internal_url": new FormControl('', [Validators.required]),
      "url": new FormControl('', [Validators.required]),
    });
   }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }

  imgChange(e){
    let body=new FormData()
    body.append('img',e.target.files[0]);
    this.commonService.showLoading()
    this.promotionService.uploadPromotionImg(body).subscribe((res:any)=>{
      this.commonService.hideLoading();
      console.log(res);
      this.img=res.output.filePath
    },(err)=>{
      this.commonService.hideLoading();
    })
  }


  submit(){
    if(this.promotionForm.valid && this.img){
      let body={
        internal_url:this.promotionForm.value.internal_url,
        url:this.promotionForm.value.url,
        banner:this.img,
      }
      this.commonService.showLoading();
      this.promotionService.addPromotion(body).subscribe((res:any)=>{
        this.commonService.hideLoading()
        if(res.status=='OK'){
          this.commonService.successToast("Promotion Added Successfully");
          this.close();
        }else{
          this.commonService.errorToast("Promotion Adding Failed")
        }
      },(err)=>{
        this.commonService.hideLoading()
        this.commonService.errorToast("Promotion Adding Failed")
      })
    }
  }


  
}
