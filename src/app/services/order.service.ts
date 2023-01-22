import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }

  getOrders(body:any): Observable<any>{
    const url=environment.baseUrl+'order/admin-get-orders'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  updateStatus(body:any): Observable<any>{
    const url=environment.baseUrl+'order/update-status'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }


  assignDriverToOrder(body:any): Observable<any>{
    const url=environment.baseUrl+'order/assign-driver-to-order'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }


  getAdminDashboard(): Observable<any>{
    const url=environment.baseUrl+'order/admin-dashboard'
    return this.httpClient.get(url,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }



}
