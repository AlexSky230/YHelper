import { NgModule } from '@angular/core';

import {SharedModule} from 'shared/shared.module';
import {WeatherComponent} from './weather.component';
import {WeatherTabsComponent} from './weather-tabs/weather-tabs.component';
import {WeekComponent} from './week/week.component';
import {WeatherHeaderComponent} from './weather-header/weather-header.component';
import {RadarComponent} from './radar/radar.component';
import {TodayComponent} from './today/today.component';
import {WeatherService} from 'shared/services/weather-http.service';
import {WeatherDataService} from 'helpers/weather-data.service';
import {SharedForecastService} from 'helpers/shared-forecast.service';



@NgModule({
  declarations: [
    WeatherComponent,
    WeatherTabsComponent,
    WeekComponent,
    WeatherHeaderComponent,
    RadarComponent,
    TodayComponent,
  ],
  imports: [SharedModule],
  providers: [
    WeatherService,
    WeatherDataService,
    SharedForecastService,
  ],
})
export class WeatherModule { }
