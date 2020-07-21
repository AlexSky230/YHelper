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
import {RouterMainPath, RouterWeatherPath} from 'shared/constants/constants';
import {LoginComponent} from './components/core/login/login.component';
import {AuthGuard} from 'shared/services/auth-guard.service';


const routes: Routes = [
  {
    path: RouterMainPath.login,
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: RouterMainPath.todo,
    component: TodoComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: RouterMainPath.weather,
    component: WeatherComponent,
    children: [
      {
        path: RouterWeatherPath.today,
        component: TodayComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: RouterWeatherPath.week,
        component: WeekComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: RouterWeatherPath.radar,
        component: RadarComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: RouterWeatherPath.empty,
        redirectTo: RouterWeatherPath.today,
        pathMatch: RouterMainPath.full,
        // canActivate: [AuthGuard],
      },
      {
        path: RouterMainPath.wildcard,
        redirectTo: RouterWeatherPath.today,
        pathMatch: RouterMainPath.full,
        // canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: RouterMainPath.shopping,
    component: ShoppingComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: RouterMainPath.fridge,
    component: FridgeComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: RouterMainPath.search,
    component: SearchComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: RouterMainPath.empty,
    redirectTo: RouterMainPath.home,
    pathMatch: RouterMainPath.full,
    // canActivate: [AuthGuard],
  },
  {
    path: RouterMainPath.wildcard,
    redirectTo: RouterMainPath.home,
    pathMatch: RouterMainPath.full,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
