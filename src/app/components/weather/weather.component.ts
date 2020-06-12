import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, switchMap, tap} from 'rxjs/operators';
import {Observable, ReplaySubject, Subscription, timer} from 'rxjs';

import {LocalStorageService} from '../../services/local-storage.service';
import {WeatherService} from '../../services/weather-http.service';

import {ForecastLocation} from '../../helpers/classes/forecast-location';
import {SharedForecastService} from '../../helpers/shared-forecast.service';

import {LOCATIONS, ServiceItems} from '../../constants/constants';
import {IsLoadingService} from '../../helpers/is-loading.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {

  private activeLocationSub = new ReplaySubject();
  public activeLocationObs = this.activeLocationSub.asObservable();

  public activeLocation: ForecastLocation;
  public currentLocationLatitude: number;
  public currentLocationLongitude: number;
  public isLoading: boolean;
  public lastSavedLocation: ForecastLocation;

  public serviceItems: typeof ServiceItems = ServiceItems;

  private busySubscription: Subscription;
  private locationSubscription: Subscription;
  private forecastSubscription: Subscription;

  constructor(
    private isLoadingService: IsLoadingService,
    private sharedForecastService: SharedForecastService,
    private weatherService: WeatherService,
    private browserLocalStorageService: LocalStorageService
  ) {
  }

  /**
   * get last saved Location and set it to activeLocation
   * if activeLocation is current or does not exist, get coordinates from browser, set activeLocation to Current Location
   * if restricted, set GoldCoast as default activeLocation
   */

  // TODO Fix bug with saving lst location. It does not work for some reason

  public ngOnInit() {
    this.busySubscription = this.isLoadingService.isLoading
      .subscribe(isBusy => this.isLoading = isBusy);
    this.getSavedLocation();

    this.locationSubscription = this.activeLocationObs
      .subscribe((location: ForecastLocation) => {
        this.activeLocation = location;
        this.sharedForecastService.setActiveLocation(location);
      });

    if (this.lastSavedLocation) {
      this.activeLocationSub.next(this.lastSavedLocation);
    } else {
      if (navigator.geolocation) {
        this.getCoordinates();
        this.setLocationToCurrent();
      } else {
        this.setLocationToDefault();
      }
    }
    /**
     * execute straight away and then with intervals given. returns Observable,
     * and passes value to SharedForecast service
     * also updating busy indicator boolean using Loading service
     */

    timer(0, (1000 * 60 * 60 * 1))
      .subscribe(() => {
        if (this.activeLocation === LOCATIONS.currentLocation) {
          this.setCoordinates();
        }
        this.forecastSubscription = this.getForecast()
          .subscribe((forecast: object) => {
            if (forecast) {
              this.sharedForecastService.setSharedForecast(forecast);
            }
          });
      });
  }

  public saveLocationToStorage(): void {
    this.browserLocalStorageService
      .addDataToStorage(this.serviceItems.lastSavedLocation, this.activeLocation);
  }

  public getSavedLocation(): void {
    this.browserLocalStorageService.getDataFromStorageById(this.serviceItems.lastSavedLocation)
      .subscribe(location => {
        if (location) {
          this.lastSavedLocation = location; // TODO don't forget to assign active Location to this somewhere
          this.activeLocationSub.next(location);
        }
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
    this.activeLocationSub.next(location);
    if (this.activeLocation.key === LOCATIONS.currentLocation.key) {
      navigator.geolocation ? this.getCoordinates() : this.setLocationToDefault();
    }
    this.getForecast()
      .subscribe((forecast: object) => {
        if (forecast) {
          this.sharedForecastService.setSharedForecast(forecast);
        }
      });
  }

  /**
   * get forecast from API or Local storage if fresh
   */
  private getForecast(): Observable<object> {
    this.isLoadingService.setIsLoading(true);

    return this.forecastIsFresh().pipe(
      switchMap((isFresh: boolean): Observable<object> => {
        if (isFresh) {
          // get from local storage
          this.isLoadingService.setIsLoading(false);
          return this.browserLocalStorageService
            .getDataFromStorageById(this.activeLocation.key + this.serviceItems.forecast);
        }
        // get from API
        return this.forecastFromAPI().pipe(
          tap((forecastData: object) => {
            this.forecastSave(forecastData);
            this.isLoadingService.setIsLoading(false);
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
      .getDataFromStorageById(this.activeLocation.key + this.serviceItems.forecastTime)
      .pipe(
        map((time: number): boolean => {
          const currentTime = Date.now();
          let result = false;
          if (time !== undefined) {
            result = Math.abs(currentTime - time) < (1000 * 60 * 60);
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
      .addDataToStorage(this.activeLocation.key + this.serviceItems.forecast, forecastData);
    this.browserLocalStorageService
      .addDataToStorage(this.activeLocation.key + this.serviceItems.forecastTime, currentTime);
  }

  private setLocationToCurrent() {
    this.activeLocationSub.next(LOCATIONS.currentLocation);
    this.getCoordinates();
  }

  private setLocationToDefault() {
    this.activeLocationSub.next(LOCATIONS.goldCoast);
  }

  ngOnDestroy(): void {
    this.saveLocationToStorage();
    this.busySubscription.unsubscribe();
    this.locationSubscription.unsubscribe();
    this.forecastSubscription.unsubscribe();
  }
}
