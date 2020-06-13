import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, switchMap, tap} from 'rxjs/operators';
import {Observable, Subscription, timer} from 'rxjs';

import {LocalStorageService} from '../../services/local-storage.service';
import {WeatherService} from '../../services/weather-http.service';

import {ForecastLocation} from '../../helpers/classes/forecast-location';
import {SharedForecastService} from '../../helpers/shared-forecast.service';

import {LOCATIONS, NamesForService} from '../../constants/constants';
import {IsLoadingService} from '../../helpers/is-loading.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {

  public namesForService: typeof NamesForService = NamesForService;

  public activeLocation: ForecastLocation;
  public currentLocationLatitude: number;
  public currentLocationLongitude: number;
  public isLoading: boolean;

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
  public ngOnInit() {
    this.busySubscription = this.isLoadingService.isLoading
      .subscribe(isBusy => this.isLoading = isBusy);

    this.locationSubscription = this.sharedForecastService.sharedActiveLocation
      .subscribe((location: ForecastLocation) => {
        this.activeLocation = location;
        this.saveLocationToStorage();
      });

    this.getLocation();

    //   // TODO FIX ORDER timer fires before getLocation()
    //   this.forecastSubscription = timer(0, (1000 * 60 * 60)).pipe(
    //     switchMap((): Observable<object> => {
    //       if (this.activeLocation.key === LOCATIONS.currentLocation.key) {
    //         this.setCoordinates();
    //       }
    //       return this.getForecast().pipe(
    //         tap((forecastData: object) => {
    //           if (forecastData) {
    //             this.sharedForecastService.setSharedForecast(forecastData);
    //           }
    //         }));
    //     })
    //   ).subscribe();
    // }

    /**
     * execute straight away and then with intervals given
     * and passes value to SharedForecast service
     */
    setInterval(() => {
      if (this.activeLocation.key === LOCATIONS.currentLocation.key) {
        this.setCoordinates();
      }
      this.updateForecast();
    }, 1000 * 60 * 60);
  }

  public updateForecast(): void {
    this.forecastSubscription = this.getForecast()
      .subscribe((forecastData: any) => {
          if (forecastData) {
            this.sharedForecastService.setSharedForecast(forecastData);
          }
        }
      );
  }

  /**
   * get location from storage
   * else try to get current coordinates and set to current
   * else set to Default (Gold Coast)
   */
  public getLocation(): void {
    this.browserLocalStorageService.getDataFromStorageById(this.namesForService.lastSavedLocation)
      .subscribe(location => {
        if (location) {
          this.sharedForecastService.setActiveLocation(location);
        } else if (navigator.geolocation) {
          this.getCoordinates();
          this.setLocationToCurrent();
        } else {
          this.setLocationToDefault();
        }
        this.updateForecast();
      });
  }

  public saveLocationToStorage(): void {
    this.browserLocalStorageService
      .addDataToStorage(this.namesForService.lastSavedLocation, this.activeLocation);
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
    this.sharedForecastService.setActiveLocation(location);
    if (this.activeLocation.key === LOCATIONS.currentLocation.key) {
      navigator.geolocation ? this.getCoordinates() : this.setLocationToDefault();
    }
    this.updateForecast();
  }

  /**
   * get forecast from API or Local storage if fresh
   */
  private getForecast(): Observable<object> {
    let forecastResult: Observable<object>;
    this.isLoadingService.setIsLoading(true);

    forecastResult = this.forecastIsFresh().pipe(
      switchMap((isFresh: boolean): Observable<object> => {
        if (isFresh) {
          // get from local storage
          this.isLoadingService.setIsLoading(false);
          return this.browserLocalStorageService
            .getDataFromStorageById(this.activeLocation.key + this.namesForService.forecast);
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
    return forecastResult;
  }

  /**
   * checking if stored forecast exists, and if it is younger then 1 hour
   */
  private forecastIsFresh(): Observable<boolean> {
    return this.browserLocalStorageService
      .getDataFromStorageById(this.activeLocation.key + this.namesForService.forecastTime)
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
    if (this.activeLocation.key === LOCATIONS.currentLocation.key &&
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
      .addDataToStorage(this.activeLocation.key + this.namesForService.forecast, forecastData);
    this.browserLocalStorageService
      .addDataToStorage(this.activeLocation.key + this.namesForService.forecastTime, currentTime);
  }

  private setLocationToCurrent() {
    this.sharedForecastService.setActiveLocation(LOCATIONS.currentLocation);
  }

  private setLocationToDefault() {
    this.sharedForecastService.setActiveLocation(LOCATIONS.goldCoast);
  }

  ngOnDestroy(): void {
    this.saveLocationToStorage();
    this.busySubscription.unsubscribe();
    this.locationSubscription.unsubscribe();
    this.forecastSubscription.unsubscribe();
  }
}
