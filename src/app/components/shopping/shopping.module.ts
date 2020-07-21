import { NgModule } from '@angular/core';
import {SharedModule} from 'shared/shared.module';
import {ShoppingHeaderComponent} from './shopping-header/shopping-header.component';
import {ShoppingListActiveComponent} from './shopping-list-active/shopping-list-active.component';
import {ShoppingListOldComponent} from './shopping-list-old/shopping-list-old.component';
import {ShoppingComponent} from './shopping.component';



@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingHeaderComponent,
    ShoppingListActiveComponent,
    ShoppingListOldComponent,
  ],
  imports: [SharedModule]
})
export class ShoppingModule { }
