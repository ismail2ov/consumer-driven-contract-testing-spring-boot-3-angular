import {Injectable}      from '@angular/core'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private _responseLogSource = new BehaviorSubject<string>('');

  responseItem$ = this._responseLogSource.asObservable();

  private _errorLogSource = new BehaviorSubject<string>('');

  errorItem$ = this._errorLogSource.asObservable();

  public noResponseText = 'No Response';
  public noErrorText = 'No Error';

  logResponse(r: any) {
    if(r === null || r === undefined) {
      this._responseLogSource.next(this.noResponseText);
    } else {
      this._responseLogSource.next(`[${new Date().toUTCString()}] ${r}`);
    }
  }

  logError(r: any) {
    if(r === null || r === undefined) {
      this._errorLogSource.next(this.noErrorText);
    } else {
      this._errorLogSource.next(r);
    }
  }
}
