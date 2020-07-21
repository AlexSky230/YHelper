import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {ForecastLocation} from 'shared/classes/forecast-location';

@Injectable({
  providedIn: 'root'
})
export class SharedForecastService {

  private locationReplaySubject = new ReplaySubject();
  public sharedActiveLocation = this.locationReplaySubject.asObservable();

  private forecastReplaySubject = new ReplaySubject();
  public sharedForecast = this.forecastReplaySubject.asObservable();


  public setActiveLocation(location: ForecastLocation): void {
    this.locationReplaySubject.next(location);
  }

  public setSharedForecast(forecast: any): void {
    this.forecastReplaySubject.next(forecast);
  }
}
