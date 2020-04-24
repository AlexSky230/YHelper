import { Component, OnInit } from '@angular/core';

import {ShoppingItem} from '../../../helpers/classes/shopping-item';
import {ShoppingService} from '../../../helpers/shopping.service';
import {CategoriesColorsService} from '../../../helpers/categories-colors.service';
import {ColorItem} from '../../../helpers/classes/color-item';

import {buttonIcons, CORE_ITEMS, shoppingLabels} from '../../../constants/constants';

@Component({
  selector: 'app-shopping-header',
  templateUrl: './shopping-header.component.html',
  styleUrls: ['./shopping-header.component.scss']
})
export class ShoppingHeaderComponent implements OnInit {

  public buttonIcons = buttonIcons;
  public shoppingLabels = shoppingLabels;

  public activeCoreItem: ColorItem;
  public newShoppingItem: ShoppingItem;
  public coreItems: ColorItem[];

  constructor(
    private shoppingService: ShoppingService,
    private categoriesColorsService: CategoriesColorsService
  ) {
    this.newShoppingItem = new ShoppingItem();
  }

  /**
   * create array of items from constants, make last coreItem "otherGrey" active
   */
  ngOnInit(): void {
    this.coreItems = Object
      .keys(CORE_ITEMS)
      .map(key => CORE_ITEMS[key]);
    this.activeCoreItem = this.coreItems[this.coreItems.length - 1];
  }

  public addShoppingItem(): void {
    this.newShoppingItem.color = this.activeCoreItem.color;
    this.newShoppingItem.order = this.activeCoreItem.order;
    this.newShoppingItem.key = this.activeCoreItem.key;
    this.shoppingService.addShoppingItem(this.newShoppingItem);
    this.newShoppingItem = new ShoppingItem();
  }

  public onCoreItemClicked(ci: ColorItem): void {
    this.activeCoreItem = ci;
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

