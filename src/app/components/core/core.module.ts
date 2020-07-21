import {NgModule} from '@angular/core';
import {SharedModule} from 'shared/shared.module';
import {RightNavigationComponent} from './right-navigation/right-navigation.component';
import {LoginComponent} from './login/login.component';

@NgModule({
  declarations: [
    RightNavigationComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    RightNavigationComponent,
  ],
})
export class CoreModule {
}
