import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppLogoComponent} from './components/app-logo/app-logo.component';
import {BusyComponent} from './components/busy/busy.component';
import {FridgeComponent} from './components/fridge/fridge.component';
import {FridgeHeaderComponent} from './components/fridge/fridge-header/fridge-header.component';
import {FridgeListComponent} from './components/fridge/fridge-list/fridge-list.component';
import {LoginComponent} from './components/login/login.component';
import {LeftNavigationComponent} from './components/left-navigation/left-navigation.component';
import {RadarComponent} from './components/weather/radar/radar.component';
import {SearchComponent} from './components/search/search.component';
import {ShoppingComponent} from './components/shopping/shopping.component';
import {ShoppingHeaderComponent} from './components/shopping/shopping-header/shopping-header.component';
import {ShoppingListActiveComponent} from './components/shopping/shopping-list-active/shopping-list-active.component';
import {ShoppingListOldComponent} from './components/shopping/shopping-list-old/shopping-list-old.component';
import {SearchHeaderComponent} from './components/search/search-header/search-header.component';
import {ShortcutListComponent} from './components/search/shortcut-list/shortcut-list.component';
import {ShortcutFormComponent} from './components/search/shortcut-form/shortcut-form.component';
import {TodayComponent} from './components/weather/today/today.component';
import {TodoComponent} from './components/todo/todo.component';
import {TodoHeaderComponent} from './components/todo/todo-header/todo-header.component';
import {TodoListComponent} from './components/todo/todo-list/todo-list.component';
import {WeatherComponent} from './components/weather/weather.component';
import {WeatherHeaderComponent} from './components/weather/weather-header/weather-header.component';
import {WeatherTabsComponent} from './components/weather/weather-tabs/weather-tabs.component';
import {WeekComponent} from './components/weather/week/week.component';

import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard.service';
import {IdService} from './helpers/id.service';
import {IsLoadingService} from './helpers/is-loading.service';
import {UserService} from './services/user.service';
import {SharedForecastService} from './helpers/shared-forecast.service';

import {WeatherDataService} from './helpers/weather-data.service';
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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

import {MatDialogModule} from '@angular/material/dialog';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';

import {AngularFireAuthModule} from '@angular/fire/auth';
import {SafeLinkPipe} from './helpers/pipes/safe-link.pipe';
import {ShortcutTitlePipe} from './helpers/pipes/shortcut-title.pipe';

import {ShortcutIconPipe} from './helpers/pipes/shortcut-icon.pipe';
import {LongTouchDirective} from './helpers/directives/long-touch.directive';


import {InputAutofocusDirective} from './helpers/directives/input-autofocus.directive';
import {environment} from '../environments/environment';
import {AdminAuthGuardService} from './services/admin-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    AppLogoComponent,
    WeatherHeaderComponent,
    FridgeComponent,
    FridgeHeaderComponent,
    FridgeListComponent,
    LeftNavigationComponent,
    RadarComponent,
    SafeLinkPipe,
    SearchComponent,
    ShoppingComponent,
    TodoComponent,
    TodayComponent,
    TodoHeaderComponent,
    TodoListComponent,
    WeatherComponent,
    WeatherTabsComponent,
    WeekComponent,
    ShoppingHeaderComponent,
    ShoppingListActiveComponent,
    ShoppingListOldComponent,
    SearchHeaderComponent,
    ShortcutListComponent,
    ShortcutFormComponent,
    ShortcutIconPipe,
    ShortcutTitlePipe,
    BusyComponent,
    LongTouchDirective,
    InputAutofocusDirective,
    LoginComponent
  ],
  entryComponents: [
    FridgeHeaderComponent,
    TodoHeaderComponent,
    ShortcutFormComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    AuthGuard,
    AdminAuthGuardService,
    AuthService,
    IsLoadingService,
    IdService,
    LocalStorageService,
    UserService,
    SharedForecastService,
    ShortcutTitlePipe,
    ShortcutIconPipe,
    WeatherService,
    WeatherDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
