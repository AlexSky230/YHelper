import { Component, OnInit } from '@angular/core';

import {ShoppingItem} from '../../../helpers/classes/shopping-item';
import {ShoppingService} from '../../../helpers/shopping.service';
import {ColorItem} from '../../../helpers/classes/color-item';

import {ButtonIcons, CORE_ITEMS, CoreLabels} from '../../../constants/constants';

@Component({
  selector: 'app-shopping-header',
  templateUrl: './shopping-header.component.html',
  styleUrls: ['./shopping-header.component.scss']
})
export class ShoppingHeaderComponent implements OnInit {

  public newShoppingItem: ShoppingItem;
  public buttonIcons = ButtonIcons;

  public coreLabels = CoreLabels;
  public activeShoppingHeaderItem: ColorItem;
  public headerShoppingItems: ColorItem[];

  constructor(private shoppingService: ShoppingService) {
    this.newShoppingItem = new ShoppingItem();
  }

  /**
   * create array of items from constants, make last coreItem "otherGrey" active
   */
  ngOnInit(): void {
    this.headerShoppingItems = Object
      .keys(CORE_ITEMS)
      .map(key => CORE_ITEMS[key]);
    this.activeShoppingHeaderItem = this.headerShoppingItems[this.headerShoppingItems.length - 1];
  }

  public addShoppingItem(): void {
    this.newShoppingItem.color = this.activeShoppingHeaderItem.color;
    this.newShoppingItem.order = this.activeShoppingHeaderItem.order;
    this.newShoppingItem.key = this.activeShoppingHeaderItem.key;
    this.shoppingService.addShoppingItem(this.newShoppingItem);
    this.newShoppingItem = new ShoppingItem();
  }

  public onHeaderItemClicked(item: ColorItem): void {
    this.activeShoppingHeaderItem = item;
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

}

