import {Component, OnInit} from '@angular/core';
import {SharedForecastService} from '../../../helpers/shared-forecast.service';
import {weatherIcons, weatherCard} from '../../../constants/constants';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  public forecast: any;
  public weatherCard = weatherCard;
  /**
   * match Icons from Weather Forecast API with Wi-Icons
   */

  constructor(private sharedForecastService: SharedForecastService) { }

  ngOnInit(): void {
    this.sharedForecastService.sharedForecast
      .subscribe(sharedForecast => this.forecast = sharedForecast);
  }

  public getWiIcon(icon: string) {
    return weatherIcons[icon] ? weatherIcons[icon] : weatherIcons['partly-cloudy-day'];
  }

}
