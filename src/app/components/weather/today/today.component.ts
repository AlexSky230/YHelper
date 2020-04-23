import {Component, OnInit, OnDestroy} from '@angular/core';
import {SharedForecastService} from '../../../helpers/shared-forecast.service';
import {weatherIcons, weatherCard} from '../../../constants/constants';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit, OnDestroy {

  public forecast: any;
  public weatherCard = weatherCard;

  private subscription: Subscription;

  constructor(private sharedForecastService: SharedForecastService) { }

  ngOnInit(): void {
    this.subscription = this.sharedForecastService.sharedForecast
      .subscribe(sharedForecast => this.forecast = sharedForecast);
  }

  /**
   * match Icons from Weather Forecast API with Wi-Icons
   */
  public getWiIcon(icon: string) {
    return weatherIcons[icon] ? weatherIcons[icon] : weatherIcons['partly-cloudy-day'];
  }

  // TODO add logic to show seabreeze link only when windy and
  //  open link depending of the location according to location

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
