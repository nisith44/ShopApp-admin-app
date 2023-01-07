import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private httpClient:HttpClient) { }

  getPromotions(body:any): Observable<any>{
    const url=environment.baseUrl+'promotion/get-promotions'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  uploadPromotionImg(body:any): Observable<any>{
    const url=environment.baseUrl+'promotion/upload-promotion-img'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  addPromotion(body:any): Observable<any>{
    const url=environment.baseUrl+'promotion/add-promotion'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  EditPromotion(body:any): Observable<any>{
    const url=environment.baseUrl+'promotion/update-promotion'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  deletePromotion(body:any): Observable<any>{
    const url=environment.baseUrl+'promotion/delete-promotion'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  
}
