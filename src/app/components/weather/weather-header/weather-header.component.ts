import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {ForecastLocation} from '../../../helpers/classes/forecast-location';
import {ButtonIcons, LOCATIONS, NamesForService} from '../../../constants/constants';
import {LocalStorageService} from '../../../services/local-storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-weather-header',
  templateUrl: './weather-header.component.html',
  styleUrls: ['./weather-header.component.scss']
})
export class WeatherHeaderComponent implements OnInit, OnDestroy {

  @Input() activeLocation: ForecastLocation;
  @Input() currentLocationLatitude: number;
  @Input() currentLocationLongitude: number;
  @Output() locationSelected = new EventEmitter();

  public buttonIcons = ButtonIcons;
  public locations: ForecastLocation[];
  public panelOpened: boolean;

  public radarLink: string;
  public radarLocations: ForecastLocation[];
  public radarSelected: string;

  public seabreezeLink: string;
  public seabreezeSelected: string;
  public seabreezeLocations: ForecastLocation[];

  public names: typeof NamesForService = NamesForService;

  private radarSubscription: Subscription;
  private seabreezeSubscription: Subscription;

  constructor(
    private localStorage: LocalStorageService
  ) {
  }

  // TODO add link selector for Radar and SeaBreeze

  /**
   * crate list of locations, first create array of keys,
   * then change each element in this array with Value of LOCATIONS
   */
  ngOnInit(): void {
    this.radarSubscription = this.localStorage.getDataFromStorageById(this.names.radarLink)
      .subscribe((link) => {
        link ? this.radarLink = link : this.radarLink = LOCATIONS.goldCoast.radarLink;
      });
    this.seabreezeSubscription = this.localStorage.getDataFromStorageById(this.names.seabreezeLink)
      .subscribe((link) => {
        link ? this.seabreezeLink = link : this.seabreezeLink = LOCATIONS.goldCoast.seabreezeLink;
      });

    this.localStorage.getDataFromStorageById(this.names.activeRadar)
      .subscribe((title) => {
        title ? this.radarSelected = title : this.radarSelected = LOCATIONS.goldCoast.key;
      });
    this.localStorage.getDataFromStorageById(this.names.activeSeabreeze)
      .subscribe((title) => {
        title ? this.seabreezeSelected = title : this.seabreezeSelected = LOCATIONS.goldCoast.key;
      });

    this.panelOpened = false;

    this.locations = Object
      .keys(LOCATIONS)
      .map(key => LOCATIONS[key]);
    this.seabreezeLocations = this.locations
      .filter((location) =>
        location.key !== LOCATIONS.currentLocation.key && location.key !== LOCATIONS.canberra.key);
    this.radarLocations = this.locations
      .filter((location) =>
        location.key !== LOCATIONS.currentLocation.key);
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

  public radarLinkClicked(location: ForecastLocation): void {
    this.radarSelected = location.key;
    this.radarLink = location.radarLink;
    this.localStorage.addDataToStorage(this.names.radarLink, this.radarLink);
    this.localStorage.addDataToStorage(this.names.activeRadar, this.radarSelected);
  }

  public seabreezeLinkClicked(location: ForecastLocation): void {
    this.seabreezeSelected = location.key;
    this.seabreezeLink = location.seabreezeLink;
    this.localStorage.addDataToStorage(this.names.seabreezeLink, this.seabreezeLink);
    this.localStorage.addDataToStorage(this.names.activeSeabreeze, this.seabreezeSelected);
  }

  ngOnDestroy(): void {
    this.seabreezeSubscription.unsubscribe();
    this.radarSubscription.unsubscribe();
  }

}
