import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.scss'],
})
export class EditPromotionComponent implements OnInit {
  promotionForm: FormGroup;
  img: any;
  @Input() promotion;

  constructor(private modalCtrl:ModalController,private commonService: CommonService,private formBuilder:FormBuilder,
    private promotionService:PromotionService) {
    this.promotionForm = this.formBuilder.group({
      "internal_url": new FormControl('', [Validators.required]),
      "url": new FormControl('', [Validators.required]),
    });
   }

  ngOnInit() {
    this.autoFillData()
  }

  autoFillData(){
    this.promotionForm.patchValue(this.promotion);
    this.img=this.promotion.banner;
  }

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
        id:this.promotion.id,
        internal_url:this.promotionForm.value.internal_url,
        url:this.promotionForm.value.url,
        banner:this.img,
      }
      this.commonService.showLoading();
      this.promotionService.EditPromotion(body).subscribe((res:any)=>{
        this.commonService.hideLoading()
        if(res.status=='OK'){
          this.commonService.successToast("Promotion Updated Successfully");
          this.close();
        }else{
          this.commonService.errorToast("Promotion Updating Failed")
        }
      },(err)=>{
        this.commonService.hideLoading()
        this.commonService.errorToast("Promotion Updating Failed")
      })
    }
  }

  
}
