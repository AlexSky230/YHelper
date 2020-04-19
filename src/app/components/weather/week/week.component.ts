import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedForecastService} from '../../../helpers/shared-forecast.service';
import {Subscription} from 'rxjs';
import {weatherIcons, weatherCard} from '../../../constants/constants';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit, OnDestroy {

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
