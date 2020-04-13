import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppLogoComponent} from './components/app-logo/app-logo.component';
import {FridgeComponent} from './components/fridge/fridge.component';
import {FridgeHeaderComponent} from './components/fridge/fridge-header/fridge-header.component';
import {FridgeListComponent} from './components/fridge/fridge-list/fridge-list.component';
import {ForecastHeaderComponent} from './components/weather/forecast-header/forecast-header.component';
import {LeftNavigationComponent} from './components/left-navigation/left-navigation.component';
import {RadarComponent} from './components/weather/radar/radar.component';
import {SearchComponent} from './components/search/search.component';
import {ShoppingComponent} from './components/shopping/shopping.component';
import {TodayComponent} from './components/weather/today/today.component';
import {TodoComponent} from './components/todo/todo.component';
import {TodoHeaderComponent} from './components/todo/todo-header/todo-header.component';
import {TodoListComponent} from './components/todo/todo-list/todo-list.component';
import {WeatherComponent} from './components/weather/weather.component';
import {WeatherTabsComponent} from './components/weather/weather-tabs/weather-tabs.component';
import {WeekComponent} from './components/weather/week/week.component';

import {IdService} from './helpers/id.service';
import {WeatherDataService} from './helpers/weather-data.service';
import {SharedForecastService} from './helpers/shared-forecast.service';

import {LocalStorageService} from './services/local-storage.service';
import {WeatherService} from './services/weather-http.service';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    LeftNavigationComponent,
    FridgeComponent,
    SearchComponent,
    ShoppingComponent,
    TodoComponent,
    WeatherComponent,
    FridgeHeaderComponent,
    FridgeListComponent,
    TodayComponent,
    WeekComponent,
    ForecastHeaderComponent,
    WeatherTabsComponent,
    RadarComponent,
    TodoHeaderComponent,
    TodoListComponent,
    AppLogoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
  ],
  providers: [
    IdService,
    LocalStorageService,
    SharedForecastService,
    WeatherService,
    WeatherDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
