import {NgModule} from '@angular/core';
import {FridgeComponent} from './fridge.component';
import {FridgeHeaderComponent} from './fridge-header/fridge-header.component';
import {FridgeListComponent} from './fridge-list/fridge-list.component';
import {SharedModule} from 'shared/shared.module';
import {FridgeRoutingModule} from './fridge-routing.module';


@NgModule({
  declarations: [
    FridgeComponent,
    FridgeHeaderComponent,
    FridgeListComponent,
  ],
  imports: [
    FridgeRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    FridgeHeaderComponent,
  ],
})
export class FridgeModule {
}
