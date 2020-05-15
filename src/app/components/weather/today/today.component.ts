import {Component, OnInit, OnDestroy} from '@angular/core';
import {SharedForecastService} from '../../../helpers/shared-forecast.service';
import {weatherIcons, weatherCard} from '../../../constants/constants';
import {Subscription} from 'rxjs';
import {IsLoadingService} from '../../../helpers/is-loading.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit, OnDestroy {

  public weatherCard = weatherCard;
  public forecast: any;
  public isLoading: boolean;

  private busySubscription: Subscription;
  private subscription: Subscription;

  constructor(
    private isLoadingService: IsLoadingService,
    private sharedForecastService: SharedForecastService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.sharedForecastService.sharedForecast
      .subscribe(sharedForecast => this.forecast = sharedForecast);
    this.busySubscription = this.isLoadingService.isLoading
      .subscribe(isBusy => this.isLoading = isBusy);
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
    this.busySubscription.unsubscribe();
  }

}
