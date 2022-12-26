import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loading: HTMLIonLoadingElement;

  constructor(private toastController: ToastController,private loadingCtrl:LoadingController) { }

  async successToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color:'success'
    });

    await toast.present();
  }

  async errorToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color:'danger'
    });

    await toast.present();
  }

  async showLoading() {
    if(!this.loading){
      this.loading = await this.loadingCtrl.create({
        message: 'Loading...',
        duration: 13000,
        cssClass: 'custom-loading',
      });
  
      this.loading.present();
    }
  }

  hideLoading(){
    this.loading.dismiss()
    this.loading=null
  }
}
