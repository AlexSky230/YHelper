import {Component, OnInit} from '@angular/core';
import {map, switchMap, tap} from 'rxjs/operators';
import {Observable, timer} from 'rxjs';

import {LocalStorageService} from '../../services/local-storage.service';
import {WeatherService} from '../../services/weather-http.service';

import {ForecastLocation} from '../../helpers/classes/forecast-location';
import {SharedForecastService} from '../../helpers/shared-forecast.service';

import {LOCATIONS} from '../../constants/constants';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  public activeLocation: ForecastLocation;
  public forecast: any;
  public currentLocationLatitude: number;
  public currentLocationLongitude: number;

  constructor(
    private sharedForecastService: SharedForecastService,
    private weatherService: WeatherService,
    private browserLocalStorageService: LocalStorageService
  ) { }
  /**
   * get coordinates from browser, set activeLocation to Current Location
   * if restricted, set GoldCoast as activeLocation
   */

  public ngOnInit() {
    if (navigator.geolocation) {
      this.setLocationToCurrent();
    } else {
      this.setLocationToDefault();
    }
    /**
     * execute straight away and then with intervals given. returns Observable,
     * and passes value to SharedForecast service
     */
    timer(0, (1000 * 60 * 60 * 1))
      .subscribe(() => {
        if (this.activeLocation === LOCATIONS.currentLocation) {
         this.setCoordinates();
        }
        this.getForecast()
          .subscribe((forecast: object) => {
            this.forecast = forecast;
            this.sharedForecastService.setSharedForecast(forecast);
          });
      });
  }

  public setCoordinates(): void {
    return navigator.geolocation ? this.getCoordinates() : this.setLocationToDefault();
  }

  public getCoordinates() {
    navigator.geolocation.getCurrentPosition(position => {
      this.currentLocationLatitude = Math.floor(position.coords.latitude * 10000) / 10000;
      this.currentLocationLongitude = Math.floor(position.coords.longitude * 10000) / 10000;
    });
  }

  public locationUpdate(location: ForecastLocation): void {
    this.activeLocation = location;
    this.sharedForecastService.setActiveLocation(location);
    if (this.activeLocation === LOCATIONS.currentLocation) {
      navigator.geolocation ? this.getCoordinates() : this.setLocationToDefault();
    }
    this.getForecast().subscribe((forecast: object) => {
      this.forecast = forecast;
      this.sharedForecastService.setSharedForecast(forecast);
    });
  }

  /**
   * get forecast from API or Local storage if fresh
   */
  private getForecast(): Observable<object> {
    return this.forecastIsFresh().pipe(
      switchMap((isFresh: boolean): Observable<object> => {
        if (isFresh) {
          // get from local storage
          return this.browserLocalStorageService
            .getDataFromStorageById(this.activeLocation.key + 'Forecast');
        }
        // get from API
        return this.forecastFromAPI().pipe(
          tap((forecastData: object) => {
            this.forecastSave(forecastData);
          })
        );
      })
    );
  }

  /**
   * checking if stored forecast exists, and if it is younger then 1 hour
   */
  private forecastIsFresh(): Observable<boolean> {
    return this.browserLocalStorageService
      .getDataFromStorageById(this.activeLocation.key + 'ForecastTime')
      .pipe(
        map((time: number): boolean => {
          let result = false;
          const currentTime = Date.now();
          if (time !== undefined) {
            result = Math.abs(currentTime - time) < (1000 * 60 * 60 * 1);
          }
          return result;
        })
      );
  }

  private forecastFromAPI(): Observable<object> {
    if (this.activeLocation === LOCATIONS.currentLocation &&
      this.currentLocationLatitude && this.currentLocationLongitude) {

      return this.weatherService
        .getForecast(this.currentLocationLatitude, this.currentLocationLongitude);
    } else {

      return this.weatherService
        .getForecast(this.activeLocation.latitude, this.activeLocation.longitude);
    }
  }

  private forecastSave(forecastData: object): void {
    const currentTime = Date.now();
    this.browserLocalStorageService
      .addDataToStorage( this.activeLocation.key + 'Forecast', forecastData);
    this.browserLocalStorageService
      .addDataToStorage(this.activeLocation.key + 'ForecastTime', currentTime);
  }

  private setLocationToCurrent() {
    this.activeLocation = LOCATIONS.currentLocation;
    this.sharedForecastService.setActiveLocation(LOCATIONS.currentLocation);
    this.getCoordinates();
  }

  private setLocationToDefault() {
    this.activeLocation = LOCATIONS.goldCoast;
    this.sharedForecastService.setActiveLocation(LOCATIONS.goldCoast);
  }
}
