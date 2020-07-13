import {NgModule} from '@angular/core';
import {SharedModule} from 'shared/shared.module';
import {LeftNavigationComponent} from './left-navigation/left-navigation.component';
import {LoginComponent} from './login/login.component';


@NgModule({
  declarations: [
    LeftNavigationComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LeftNavigationComponent,
  ],
})
export class CoreModule {
}
