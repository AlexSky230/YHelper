import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedForecastService} from '../../../helpers/shared-forecast.service';
import {Subscription} from 'rxjs';
import {WeatherIcons} from '../../../constants/constants';
import {IsLoadingService} from '../../../helpers/is-loading.service';
import {slideComponentRight} from '../../../animations/animations';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
  animations: [slideComponentRight]
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
    return WeatherIcons[icon] ? WeatherIcons[icon] : WeatherIcons['partly-cloudy-day'];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.busySubscription.unsubscribe();
  }

// TODO add proper scroll so the corners of the card do not cut
}
