import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        }
        return event;
      }), catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          this.router.navigate(['/login'])
        }
        if (error.status === 0) {
          console.log("no internet");
        }
        
        return throwError(error);
      }));

  }

  
}
