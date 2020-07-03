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
import {RouterMainPath, RouterWeatherPath} from './constants/constants';
import {LoginComponent} from './components/login/login.component';


const routes: Routes = [
  {
    path: RouterMainPath.login,
    component: LoginComponent
  },
  {
    path: RouterMainPath.todo,
    component: TodoComponent
  },
  {
    path: RouterMainPath.weather,
    component: WeatherComponent,
    children: [
      {
        path: RouterWeatherPath.today,
        component: TodayComponent
      },
      {
        path: RouterWeatherPath.week,
        component: WeekComponent
      },
      {
        path: RouterWeatherPath.radar,
        component: RadarComponent
      },
      {
        path: RouterWeatherPath.empty,
        redirectTo: RouterWeatherPath.today,
        pathMatch: RouterMainPath.full
      },
      {
        path: RouterMainPath.wildcard,
        redirectTo: RouterWeatherPath.today,
        pathMatch: RouterMainPath.full
      },
    ]
  },
  {
    path: RouterMainPath.shopping,
    component: ShoppingComponent
  },
  {
    path: RouterMainPath.fridge,
    component: FridgeComponent
  },
  {
    path: RouterMainPath.search,
    component: SearchComponent
  },
  {
    path: RouterMainPath.empty,
    redirectTo: RouterMainPath.home,
    pathMatch: RouterMainPath.full
  },
  {
    path: RouterMainPath.wildcard,
    redirectTo: RouterMainPath.home,
    pathMatch: RouterMainPath.full
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
