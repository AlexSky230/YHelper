import {Component, OnInit} from '@angular/core';
import {ShoppingService} from '../../helpers/shopping.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ShoppingHeaderComponent} from './shopping-header/shopping-header.component';
import {ButtonIcons} from '../../constants/constants';
import {ShoppingItem} from '../../helpers/classes/shopping-item';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  public buttonIcons = ButtonIcons;

  constructor(
    private bottomSheet: MatBottomSheet,
    private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    this.shoppingService.getStoredItems('shoppingItems');
    this.shoppingService.getStoredItems('shoppingItemsOld');
  }

  public openMenu() {
    this.bottomSheet.open(ShoppingHeaderComponent);
  }

  /**
   * button-click: move selected items from old Shopping list to fridge list component
   */
  public pushToFridge(): void {
    this.shoppingService.moveSelectedToFridge();
  }

  /**
   * return true if there are ticked items in the OldList Array
   */
  public get isSelectedInOld(): boolean {
    return this.shoppingService.isSelectedInOld;
  }

  public get toBuyAmount(): number {
    return this.shoppingService.getNewShoppingItems().length;
  }

  public get boughtAmount(): number {
    return this.shoppingService.getOldShoppingItems().length;
  }

}
