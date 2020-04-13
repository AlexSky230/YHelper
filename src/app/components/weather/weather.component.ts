import {Component, OnInit} from '@angular/core';
import {WeatherDataService} from '../../helpers/weather-data.service';
import {WeatherService} from '../../services/weather-http.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {Observable, timer} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {SharedForecastService} from '../../helpers/shared-forecast.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  public activeLocation = 'Gold Coast';
  public forecast: object;
  public latitude = -28.0167;
  public longitude = 153.4000;

  constructor(
    private sharedForecastService: SharedForecastService,
    private weatherDataService: WeatherDataService,
    private weatherService: WeatherService,
    private browserLocalStorageService: LocalStorageService) {
  }

  public ngOnInit() {
    /**
     * get coordinates from browser
     */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = Math.floor(position.coords.latitude * 10000) / 10000;
        this.longitude = Math.floor(position.coords.longitude * 10000) / 10000;
        this.activeLocation = 'Current Location';
      });
    }
    /**
     * execute straight away and then with intervals given. returns Observable,
     * and passes value to SharedForecast service
     */
    timer(0, (1000 * 60 * 60 * 1))
      .subscribe(() => {
        this.getForecast()
          .subscribe((forecast: object) => {
            this.forecast = forecast;
            this.sharedForecastService.setSharedForecast(forecast);
          });
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
            .getDataFromStorageById(this.activeLocation + 'Forecast');
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
      .getDataFromStorageById(this.activeLocation + 'ForecastTime')
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
    if (this.latitude !== undefined && this.longitude !== undefined) {
      return this.weatherService.currentForecast(this.latitude, this.longitude);
    }
  }

  private forecastSave(forecastData: object): void {
    const currentTime = Date.now();
    this.browserLocalStorageService
      .addDataToStorage( this.activeLocation + 'Forecast', forecastData);
    this.browserLocalStorageService
      .addDataToStorage(this.activeLocation + 'ForecastTime', currentTime);
  }

  public locationUpdate(location: string): void {
    this.activeLocation = location;
    this.latitude = this.weatherDataService.getLocationCoordinates(location).latitude;
    this.longitude = this.weatherDataService.getLocationCoordinates(location).longitude;
    this.getForecast().subscribe((forecast: object) => {
      this.forecast = forecast;
      this.sharedForecastService.setSharedForecast(forecast);
    });
  }

  get locationNames(): string[] {
    return this.weatherDataService.getLocationNames();
  }
}
