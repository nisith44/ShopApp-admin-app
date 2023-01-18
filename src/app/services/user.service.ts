import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  login(body:any): Observable<any>{
    const url=environment.baseUrl+'user/admin-login'
    return this.httpClient.post(url,body);
  }

  getLoggedUserData(): Observable<any>{
    const url=environment.baseUrl+'user/get-logged-user-data'
    let token =sessionStorage.getItem('token')
    return this.httpClient.get(url,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
  }


  getAllUsers(body:any): Observable<any>{
    const url=environment.baseUrl+'user/get-all-users'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  addUser(body:any): Observable<any>{
    const url=environment.baseUrl+'user/add-user'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  updateUser(body:any): Observable<any>{
    const url=environment.baseUrl+'user/update-user'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  deleteUser(body:any): Observable<any>{
    const url=environment.baseUrl+'user/delete-user'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  updateAdminAccount(body:any): Observable<any>{
    const url=environment.baseUrl+'user/update-admin-account'
    return this.httpClient.post(url,body,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  getAllDrivers(): Observable<any>{
    const url=environment.baseUrl+'user/get-all-drivers'
    return this.httpClient.get(url,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

}
