import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  private locations = new Map ([
    ['Current Location', {latitude: -28.0167, longitude: 153.4000}],
    ['Gold Coast', {latitude: -28.0167, longitude: 153.4000}],
    ['Brisbane', {latitude: -27.4698, longitude: 153.0251}],
    ['Sydney', {latitude: -33.8708, longitude: 151.2073}],
    ['Melbourne', {latitude: -37.8136, longitude: 144.9631}],
    ['Perth', {latitude: -31.9505, longitude: 115.8605}],
    ['Canberra',  {latitude: -35.2809, longitude: 149.1300}]
  ]);

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

  public getLocationNames() {
    return Array.from(this.locations.keys());
  }

  public getLocationCoordinates(location: string) {
    return this.locations.get(location);
  }

  public getIcon(icon: string) {
    return this.icons.get(icon) ? this.icons.get(icon) : 'wi wi-day-cloudy';
  }
}
