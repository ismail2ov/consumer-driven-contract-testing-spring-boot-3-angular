import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '@core/services/logger/logger.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        let errorMessage: string;
        if (error.error) {
          errorMessage = `response.error - Server-side error: ${JSON.stringify(error.error)}`;
        } else {
          errorMessage = `status/message - Server-side error: ${error.status} ${error.message}`;
        }
        this.logger.logError(errorMessage);
        return throwError(() => errorMessage);
      })
    );
  }
}
