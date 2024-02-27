import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  token:string = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIwIiwidGVuYW50X2VtYWlsIjoiYW1pdC5rdW1iaGFyQGdvZGlnaXRhbHRjLmNvbSIsImNyZWF0ZWRfb24iOiIyLzI3LzIwMjQgNzowNToyMyBBTSIsImV4cCI6MTcwOTM2MzEyNH0.RDB_j5s9LLfFQ2ISnSxQMjRGu3RMFiaUqfBs5okKTRw'

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let modifiedRequest;
    modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', `bearer ${this.token}`).set('Content-Type', 'application/json'),
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error: any) => {
        // console.log(error)
        return throwError(error);
      }),
      finalize(() => {
        // console.log("res")
      })
    );
  }
}
