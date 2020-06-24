import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  /**
   * match Icons from Weather Forecast API with Wi-Icons
   */
  private icons = new Map([
    ['clear-day', 'wi wi-day-sunny'],
    ['clear-night', 'wi wi-night-clear'],
    ['partly-cloudy-day', 'wi wi-day-cloudy'],
    ['partly-cloudy-night', 'wi wi-night-alt-cloudy'],
    ['cloudy', 'wi wi-cloudy'],
    ['rain', 'wi wi-rain'],
    ['wind', 'wi wi-strong-wind'],
    ['hail', 'wi wi-hail'],
  ]);

  public getIcon(icon: string) {
    return this.icons.get(icon) ? this.icons.get(icon) : 'wi wi-day-cloudy';
  }
}
