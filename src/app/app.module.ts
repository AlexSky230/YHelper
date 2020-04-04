import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbSidebarModule,
  NbMenuModule,
  NbCardModule,
  NbInputModule, NbFormFieldModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LeftNavigationComponent } from './components/left-navigation/left-navigation.component';
import { FridgeComponent } from './components/fridge/fridge.component';
import { SearchComponent } from './components/search/search.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { TodoComponent } from './components/todo/todo.component';
import { WeatherComponent } from './components/weather/weather.component';
import { FridgeHeaderComponent } from './components/fridge/fridge-header/fridge-header.component';
import { FridgeListComponent } from './components/fridge/fridge-list/fridge-list.component';
import { TodayComponent } from './components/weather/today/today.component';
import { WeekComponent } from './components/weather/week/week.component';
import { ForecastHeaderComponent } from './components/weather/forecast-header/forecast-header.component';
import { WeatherTabsComponent } from './components/weather/weather-tabs/weather-tabs.component';
import { RadarComponent } from './components/weather/radar/radar.component';
import { TodoHeaderComponent } from './components/todo/todo-header/todo-header.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'dark'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbIconModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbCardModule,
    NbInputModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
