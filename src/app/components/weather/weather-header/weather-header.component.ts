import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ForecastLocation} from '../../../helpers/classes/forecast-location';
import {LOCATIONS} from '../../../constants/constants';

@Component({
  selector: 'app-weather-header',
  templateUrl: './weather-header.component.html',
  styleUrls: ['./weather-header.component.scss']
})
export class WeatherHeaderComponent implements OnInit {

  @Input() activeLocation: ForecastLocation;
  @Input() currentLocationLatitude: number;
  @Input() currentLocationLongitude: number;
  @Output() locationSelected = new EventEmitter();

  public locations: ForecastLocation[];

  /**
   * first create array of keys,
   * then change each element in this array with Valueobject of LOCATIONS
   */
  ngOnInit(): void {
    this.locations = Object
      .keys(LOCATIONS)
      .map(key => LOCATIONS[key]);
  }

  public get latitude() {
    return this.activeLocation === LOCATIONS.currentLocation ?
      this.currentLocationLatitude : this.activeLocation.latitude;
  }

  public get longitude() {
    return this.activeLocation === LOCATIONS.currentLocation ?
      this.currentLocationLongitude : this.activeLocation.longitude;
  }

  public cityClicked(location: ForecastLocation): void {
    this.locationSelected.emit(location);
  }
}