import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BusyComponent} from 'shared/components/busy/busy.component';

import {AuthGuard} from 'shared/services/auth-guard.service';
import {AuthService} from 'shared/services/auth.service';
import {IsLoadingService} from 'helpers/is-loading.service';
import {IdService} from 'helpers/id.service';
import {LocalStorageService} from 'shared/services/local-storage.service';

import {AngularMaterialsModule} from '../angular-materials.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputAutofocusDirective} from 'helpers/directives/input-autofocus.directive';
import {AppLogoComponent} from 'shared/components/app-logo/app-logo.component';
import {SafeLinkPipe} from 'helpers/pipes/safe-link.pipe';
import {LongTouchDirective} from 'helpers/directives/long-touch.directive';
import {RouterModule} from '@angular/router';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppLogoComponent,
    BusyComponent,
    InputAutofocusDirective,
    LongTouchDirective,
    SafeLinkPipe,
  ],
  imports: [
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CommonModule,
    AngularMaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LongTouchDirective,
    SafeLinkPipe,
    AppLogoComponent,
    BusyComponent,
    CommonModule,
    InputAutofocusDirective,
    AngularMaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    IsLoadingService,
    IdService,
    LocalStorageService,
  ],
})
export class SharedModule {
}
