import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  getProducts(body:any): Observable<any>{
    const url=environment.baseUrl+'product/admin-get-products'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  


}
