import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ForecastLocation} from '../../../helpers/classes/forecast-location';
import {ButtonIcons, LOCATIONS} from '../../../constants/constants';
import {Observable} from 'rxjs';

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

  public buttonIcons = ButtonIcons;
  public locations: ForecastLocation[];
  public panelOpened: boolean;

  // TODO add link selector for Radar and SeaBreeze

  /**
   * crate list of locations, first create array of keys,
   * then change each element in this array with Value of LOCATIONS
   */
  ngOnInit(): void {
    this.panelOpened = false;
    this.locations = Object
      .keys(LOCATIONS)
      .map(key => LOCATIONS[key]);
  }

  public get latitude() {
    return this.activeLocation.key === LOCATIONS.currentLocation.key ?
      this.currentLocationLatitude : this.activeLocation.latitude;
  }

  public get longitude() {
    return this.activeLocation.key === LOCATIONS.currentLocation.key ?
      this.currentLocationLongitude : this.activeLocation.longitude;
  }

  public togglePanelOpened(): void {
    this.panelOpened = !this.panelOpened;
  }

  public cityClicked(location: ForecastLocation): void {
    this.locationSelected.emit(location);
  }
}
