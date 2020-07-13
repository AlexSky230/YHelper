import {Component, ViewChild} from '@angular/core';
import {ShoppingService} from 'helpers/shopping.service';
import {ShoppingItem} from 'shared/classes/shopping-item';
import {ButtonIcons} from 'shared/constants/constants';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ShoppingHeaderComponent} from '../shopping-header/shopping-header.component';

@Component({
  selector: 'app-shopping-list-active',
  templateUrl: './shopping-list-active.component.html',
  styleUrls: ['./shopping-list-active.component.scss']
})
export class ShoppingListActiveComponent {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  public buttonIcons = ButtonIcons;
  public menuData: ShoppingItem;

  constructor(
    public bottomSheet: MatBottomSheet,
    private shoppingListService: ShoppingService
  ) {
  }

  public get shoppingItems(): ShoppingItem[] {
    return this.shoppingListService.getNewShoppingItems();
  }

  public editItem(item: ShoppingItem) {
    this.bottomSheet.open(ShoppingHeaderComponent, {data: item});
  }

  public removeItem(item: ShoppingItem): void {
    this.shoppingListService.deleteShoppingItem(item);
  }

  public setMenuData(item: ShoppingItem): void {
    event.stopPropagation();
    this.menuData = item;
  }

  public toggleShoppingItemBought(item: ShoppingItem): void {
    this.shoppingListService.toggleShoppingItemBought(item);
  }
}
