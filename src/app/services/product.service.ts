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

  uploadProductImg(body:any): Observable<any>{
    const url=environment.baseUrl+'product/upload-product-img'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  addProduct(body:any): Observable<any>{
    const url=environment.baseUrl+'product/add-product'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  EditProduct(body:any): Observable<any>{
    const url=environment.baseUrl+'product/update-product'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  deleteProduct(body:any): Observable<any>{
    const url=environment.baseUrl+'product/delete-product'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  getCategories(): Observable<any>{
    const url=environment.baseUrl+'product/get-categories'
    return this.httpClient.get(url,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  addCategory(body:any): Observable<any>{
    const url=environment.baseUrl+'product/add-category'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  deleteCategory(body:any): Observable<any>{
    const url=environment.baseUrl+'product/delete-category'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  


}
