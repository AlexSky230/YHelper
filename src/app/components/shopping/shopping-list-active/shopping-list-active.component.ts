import {Component} from '@angular/core';
import {ShoppingService} from '../../../helpers/shopping.service';
import {ShoppingItem} from '../../../helpers/classes/shopping-item';
import {ButtonIcons} from '../../../constants/constants';

@Component({
  selector: 'app-shopping-list-active',
  templateUrl: './shopping-list-active.component.html',
  styleUrls: ['./shopping-list-active.component.scss']
})
export class ShoppingListActiveComponent {

  public buttonIcons = ButtonIcons;

  constructor(private shoppingListService: ShoppingService) {
  }

  public get shoppingItems(): ShoppingItem[] {
    return this.shoppingListService.getNewShoppingItems();
  }

  public removeItem(item: ShoppingItem): void {
    this.shoppingListService.deleteShoppingItem(item);
  }

  public toggleShoppingItemBought(item: ShoppingItem): void {
    this.shoppingListService.toggleShoppingItemBought(item);
  }
}
