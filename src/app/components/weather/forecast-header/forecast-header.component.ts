import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {ForecastLocation} from '../../../helpers/classes/forecastLocation';
import {LOCATIONS} from '../../../constants/constants';

@Component({
  selector: 'app-forecast-header',
  templateUrl: './forecast-header.component.html',
  styleUrls: ['./forecast-header.component.scss']
})
export class ForecastHeaderComponent implements OnInit {

  @Input() activeLocation: ForecastLocation;
  @Input() currentLocationLatitude: number;
  @Input() currentLocationLongitude: number;
  @Output() locationSelected = new EventEmitter();

  public locations: ForecastLocation[];

  // need to figure out how it works
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
