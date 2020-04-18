import {Component, OnInit} from '@angular/core';
import {SharedForecastService} from '../../../helpers/shared-forecast.service';
import {weatherIcons} from '../../../constants/constants';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  private forecast: any;
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
