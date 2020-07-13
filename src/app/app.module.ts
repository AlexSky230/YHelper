import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';

import {AngularFireModule} from '@angular/fire';

import {AdminModule} from './admin/admin.module';
import {AngularMaterialsModule} from './angular-materials.module';
import {FridgeModule} from './components/fridge/fridge.module';
import {FridgeRoutingModule} from './components/fridge/fridge-routing.module';
import {CoreModule} from './components/core/core.module';
import {SharedModule} from 'shared/shared.module';
import {SearchModule} from './components/search/search.module';
import {ShoppingModule} from './components/shopping/shopping.module';
import {TodoModule} from './components/todo/todo.module';
import {WeatherModule} from './components/weather/weather.module';

import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AngularMaterialsModule,
    AdminModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    FridgeRoutingModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    FridgeModule,
    SearchModule,
    ShoppingModule,
    TodoModule,
    WeatherModule,
    HttpClientModule,
    SharedModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
