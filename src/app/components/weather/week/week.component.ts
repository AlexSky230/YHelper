import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedForecastService} from '../../../helpers/shared-forecast.service';
import {Subscription} from 'rxjs';
import {weatherIcons} from '../../../constants/constants';
import {IsLoadingService} from '../../../helpers/is-loading.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit, OnDestroy {

  public forecast: any;
  public isLoading: boolean;

  private subscription: Subscription;
  private busySubscription: Subscription;

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.busySubscription.unsubscribe();
  }

// TODO add proper scroll so the corners of the card do not cut
}
