import {Component, OnDestroy, OnInit} from '@angular/core';
import {ForecastLocation} from '../../../helpers/classes/forecastLocation';
import {SharedForecastService} from '../../../helpers/shared-forecast.service';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})

export class RadarComponent implements OnInit, OnDestroy {

  public radarLink: string;

  constructor(private sharedForecast: SharedForecastService) { }

  // TODO Deal with current location.
  //  Should readdress to the closest radar comparing coordinates somehow check link below...
  //  https://www.sitepoint.com/community/t/find-record-with-closest-latitude-longitude-from-stringifyed-data-in-localstorage/23845
  public ngOnInit(): void {
    this.radarLink = this.activeLocation.radarLink;
  }

  // TODO Update Link in Iframe dynamically, or create a refresh function.
  get activeLocation(): ForecastLocation {
    return this.sharedForecast.getActiveLocation();
  }

  public ngOnDestroy(): void {
    this.radarLink = '';
  }

}




