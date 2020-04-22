import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {ForecastLocation} from './classes/forecastLocation';

@Injectable({
  providedIn: 'root'
})
export class SharedForecastService {

  private activeLocation: ForecastLocation;

  // tslint:disable-next-line:variable-name
  private _forecast = new ReplaySubject();
  public sharedForecast = this._forecast.asObservable();

  public setSharedForecast(forecast): void {
    this._forecast.next(forecast);
  }

  public setActiveLocation(location: ForecastLocation): void {
    this.activeLocation = location;
  }

  public getActiveLocation(): ForecastLocation {
    return this.activeLocation;
  }

}
