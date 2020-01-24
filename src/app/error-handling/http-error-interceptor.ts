import { catchError, tap, retry } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
export class HttpErrorInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(3),
        tap(data => console.log(data)),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred.
            console.error('Error occurred:', error.error.message);
          } else {
            // Unsuccessful response code from backend
            console.error(
              `Returned code ${error.status}, ` +
              `body was: ${error.error}`);

              // can add status code specific routing here for specific error page display
              /* switch (error.status) {
                case 401:      //login
                    this.router.navigateByUrl("/login");
                    break;
                case 403:     //forbidden
                    this.router.navigateByUrl("/unauthorized");
                    break; */
          }
          // return an observable with a user-facing error message
          return throwError(
            'An error occured, please try again later');
        })
      );
  }
}
