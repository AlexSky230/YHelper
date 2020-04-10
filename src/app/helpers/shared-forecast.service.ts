import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedForecastService {

  // tslint:disable-next-line:variable-name
  private _forecast = new ReplaySubject();
  public sharedForecast = this._forecast.asObservable();

  constructor() {}

  public setSharedForecast(forecast): void {
    this._forecast.next(forecast);
  }
}
