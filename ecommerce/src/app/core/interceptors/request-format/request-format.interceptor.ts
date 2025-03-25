import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestFormatInterceptor implements HttpInterceptor {
  private readonly headers = new HttpHeaders({'Content-Type': 'application/json'});
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({headers: this.headers});
    return next.handle(request).pipe(finalize(() => {
        console.log(`request headers: ${JSON.stringify(request.headers)}`);
    }),
    catchError((error) => {
        console.error(`request error: ${error}`);
        throw error;
    }));
  }
}
