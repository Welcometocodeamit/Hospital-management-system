import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  token:string = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIwIiwidGVuYW50X2VtYWlsIjoiYW1pdC5rdW1iaGFyQGdvZGlnaXRhbHRjLmNvbSIsImNyZWF0ZWRfb24iOiIyLzI3LzIwMjQgNzowNToyMyBBTSIsImV4cCI6MTcwOTM2MzEyNH0.RDB_j5s9LLfFQ2ISnSxQMjRGu3RMFiaUqfBs5okKTRw'
  // token:string =null
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let modifiedRequest;
    
    modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', `bearer ${this.token}`).set('Content-Type', 'application/json'),
    }); 
    this.spinner.show();
    return next.handle(modifiedRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body) {
          if(event.body.message){
             this.toastr.success(event.body.message, 'Sucess');
          }
        }
        return event;
      }),
      catchError((error: any) => {
        this.spinner.hide();
        this.toastr.error(`Status: ${error.status} ` + `- `+ error.statusText, 'Error');
        return throwError(error);
      }),
      finalize(() => {

        this.spinner.hide();
      })
    );
  }
}
