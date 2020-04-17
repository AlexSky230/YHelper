import {Component, OnInit} from '@angular/core';
import {SharedForecastService} from '../../../helpers/shared-forecast.service';
import {WeatherDataService} from '../../../helpers/weather-data.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  private forecast: any;

  constructor(
    private weatherDataService: WeatherDataService,
    private sharedForecastService: SharedForecastService
  ) {}

  ngOnInit(): void {
    this.sharedForecastService.sharedForecast
      .subscribe(sharedForecast => this.forecast = sharedForecast);
  }

  getWeatherIcon(icon) {
    return this.weatherDataService.getIcon(icon);
  }

}
