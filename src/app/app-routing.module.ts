import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoComponent} from './components/todo/todo.component';
import {SearchComponent} from './components/search/search.component';
import {FridgeComponent} from './components/fridge/fridge.component';
import {ShoppingComponent} from './components/shopping/shopping.component';
import {WeatherComponent} from './components/weather/weather.component';
import {TodayComponent} from './components/weather/today/today.component';
import {WeekComponent} from './components/weather/week/week.component';
import {RadarComponent} from './components/weather/radar/radar.component';
import {routerMainPath, routerWeatherPath} from './constants/constants';


const routes: Routes = [
  {
    path: routerMainPath.todo,
    component: TodoComponent
  },
  {
    path: routerMainPath.weather,
    component: WeatherComponent,
    children: [
      {
        path: routerWeatherPath.empty,
        component: TodayComponent
      },
      {
        path: routerWeatherPath.today,
        component: TodayComponent
      },
      {
        path: routerWeatherPath.week,
        component: WeekComponent
      },
      {
        path: routerWeatherPath.radar,
        component: RadarComponent
      },
      {
        path: routerMainPath.wildcard,
        component: TodoComponent
      },
    ]
  },
  {
    path: routerMainPath.shopping,
    component: ShoppingComponent
  },
  {
    path: routerMainPath.fridge,
    component: FridgeComponent
  },
  {
    path: routerMainPath.search,
    component: SearchComponent
  },
  {
    path: routerMainPath.empty,
    redirectTo: routerMainPath.home,
    pathMatch: routerMainPath.full
  },
  {
    path: routerMainPath.wildcard,
    redirectTo: routerMainPath.home,
    pathMatch: routerMainPath.full
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
