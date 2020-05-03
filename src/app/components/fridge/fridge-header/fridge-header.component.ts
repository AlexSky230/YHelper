import { Component, OnInit } from '@angular/core';

import {FridgeService} from '../../../helpers/fridge.service';

import {ColorItem} from '../../../helpers/classes/color-item';
import {ShoppingItem} from '../../../helpers/classes/shopping-item';

import {buttonIcons, CORE_ITEMS, coreLabels} from '../../../constants/constants';

@Component({
  selector: 'app-fridge-header',
  templateUrl: './fridge-header.component.html',
  styleUrls: ['./fridge-header.component.scss']
})
export class FridgeHeaderComponent implements OnInit{

  public newFridgeItem: ShoppingItem;
  public buttonIcons = buttonIcons;
  // public shoppingLabels = shoppingLabels;
  public activeFridgeHeaderItem: ColorItem;
  public headerFridgeItems: ColorItem[];

  constructor(private fridgeService: FridgeService) {
    this.newFridgeItem = new ShoppingItem();
  }

  /**
   * create array of items from constants, make last coreItem "otherGrey" active
   */
  public ngOnInit(): void {
    this.headerFridgeItems = Object
      .keys(CORE_ITEMS)
      .map(key => CORE_ITEMS[key])
      .filter((a) => a.order < 5 || a.order === 9);
    this.activeFridgeHeaderItem = this.headerFridgeItems[this.headerFridgeItems.length - 1];
  }

  public addFridgeItem(): void {
    this.newFridgeItem.color = this.activeFridgeHeaderItem.color;
    this.newFridgeItem.order = this.activeFridgeHeaderItem.order;
    this.newFridgeItem.key = this.activeFridgeHeaderItem.key;
    this.fridgeService.addFridgeItem(this.newFridgeItem);
    this.newFridgeItem = new ShoppingItem();
  }

  public onHeaderItemClicked(item: ColorItem) {
    this.activeFridgeHeaderItem = item;
  }

  // private CategorySelected(): boolean {
  //   return this.fridgeService.categoryColor !== undefined;
  // }

  public deleteFridgeItemsBySelected(): void {
    this.fridgeService.deleteFridgeItemsBySelected();
  }

  // private get category(): string {
  //   return this.fridgeService.categoryColor.type;
  // }

  // /**
  //  * get selected color form categoryColor, or if still undefined make it grey
  //  */
  // get selectedColor(): string {
  //   return this.fridgeService.categoryColor !== undefined
  //     ? this.fridgeService.categoryColor.color
  //     : 'grey';
  // }

  public get isSelectedInList(): boolean {
    return this.fridgeService.isSelectedInList;
  }

  // private get fridgeItemsSelected(): ShoppingItem[] {
  //   return this.fridgeService.getAllFridgeItems()
  //     .filter((item) => item.selected);
  // }
}
