import { Component } from '@angular/core';
import {WEATHER_TABS} from '../../../constants/constants';

@Component({
  selector: 'app-weather-tabs',
  templateUrl: './weather-tabs.component.html',
  styleUrls: ['./weather-tabs.component.scss']
})
export class WeatherTabsComponent {

  tabs = [
    {
      title: WEATHER_TABS.today.title,
      link: WEATHER_TABS.today.link,
    },
    {
      title: WEATHER_TABS.week.title,
      link: WEATHER_TABS.week.link,
    },
    {
      title: WEATHER_TABS.radar.title,
      link: WEATHER_TABS.radar.link,
    },
  ];

}
