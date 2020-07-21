import { Component } from '@angular/core';
import {ShoppingService} from 'helpers/shopping.service';
import {ShoppingItem} from 'shared/classes/shopping-item';
import {ButtonIcons} from 'shared/constants/constants';

@Component({
  selector: 'app-shopping-list-old',
  templateUrl: './shopping-list-old.component.html',
  styleUrls: ['./shopping-list-old.component.scss']
})
export class ShoppingListOldComponent {

  public buttonIcons = ButtonIcons;

  constructor( private shoppingListService: ShoppingService ) { }

  public removeOldItem(item: ShoppingItem) {
    this.shoppingListService.deleteOldShoppingItem(item);
  }

  /**
   * move Item from OldList to NewList
   */
  public restoreItem(item: ShoppingItem) {
    this.shoppingListService.moveToNew(item);
  }

  public toggleItemSelected(item) {
    this.shoppingListService.toggleItemSelected(item);
  }

  /**
   * get item list sorted by order for better user experience
   */
  public get shoppingItemsOld(): ShoppingItem[] {
    return this.shoppingListService.getOldShoppingItems();
  }

}
