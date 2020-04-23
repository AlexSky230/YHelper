import { Component, OnInit } from '@angular/core';

import {ShoppingItem} from '../../../helpers/classes/shopping-item';
import {ShoppingService} from '../../../helpers/shopping.service';
import {CategoriesColorsService} from '../../../helpers/categories-colors.service';
import {CoreItem} from '../../../helpers/classes/core-item';

import {buttonIcons, CORE_ITEMS, shoppingLabels} from '../../../constants/constants';

@Component({
  selector: 'app-shopping-header',
  templateUrl: './shopping-header.component.html',
  styleUrls: ['./shopping-header.component.scss']
})
export class ShoppingHeaderComponent implements OnInit {

  public buttonIcons = buttonIcons;
  public shoppingLabels = shoppingLabels;

  public activeCoreItem: CoreItem;
  public newShoppingItem: ShoppingItem;
  public coreItems: CoreItem[];

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
    this.shoppingService.addShoppingItem(this.newShoppingItem);
    this.newShoppingItem = new ShoppingItem();
  }

  /**
   * set selectedColor object in shopping service
   * reset .selected=false for all items except clicked item in categoriesColorsService
   * add new shoppingItem to reduce clicks for user
   */
  public onCoreItemClicked(ci: CoreItem): void {
    this.activeCoreItem = ci;
    this.shoppingService.setColorOrder(ci);
    this.categoriesColorsService.colorsToDefault();
    ci.selected = true;
    this.addShoppingItem();
  }

  /**
   * button-click: move items from old Shopping list to fridge list component
   */
  public pushToFridge(): void {
    this.shoppingService.moveSelectedToFridge();
  }

  public get categoryColor(): CoreItem {
    return this.shoppingService.getCategoryColor();
  }

  public get oldShoppingItemsTicked(): ShoppingItem[] {
    return this.shoppingService.getOldShoppingItems()
      .filter((item) => item.selected);
  }

}

