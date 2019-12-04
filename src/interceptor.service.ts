import { Injectable } from '@angular/core';
    import {
    HttpInterceptor, HttpRequest,HttpResponse,
    HttpHandler, HttpEvent, HttpErrorResponse
    } from '@angular/common/http';
    import { Observable, throwError } from 'rxjs';
    import { retry, catchError } from 'rxjs/operators';
    import { Router } from '@angular/router';
    import {MatSnackBar} from '@angular/material/snack-bar';

    @Injectable()
    export class InterceptorService implements HttpInterceptor{
    constructor(private router: Router){}

    //We intercept all http request
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        //we catch the error
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = "Impossible to load the file from the Api, you will be redirected";
          }
          window.alert(errorMessage);
          this.router.navigate(['/error'])
          return throwError(errorMessage);
        })
      )
  }

}
