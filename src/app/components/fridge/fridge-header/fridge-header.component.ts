import {Component, Inject, OnInit} from '@angular/core';

import {FridgeService} from '../../../helpers/fridge.service';

import {ColorItem} from '../../../helpers/classes/color-item';
import {ShoppingItem} from '../../../helpers/classes/shopping-item';

import {ButtonIcons, CORE_ITEMS, CoreLabels} from '../../../constants/constants';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-fridge-header',
  templateUrl: './fridge-header.component.html',
  styleUrls: ['./fridge-header.component.scss']
})
export class FridgeHeaderComponent implements OnInit{

  public activeShelf: string;
  public newFridgeItem: ShoppingItem;
  public buttonIcons = ButtonIcons;

  public activeFridgeHeaderItem: ShoppingItem;
  public headerFridgeItems: ShoppingItem[];
  public coreLabels = CoreLabels;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public itemInEdit: ShoppingItem,
    private bottomSheetRef: MatBottomSheetRef<FridgeHeaderComponent>,
    private fridgeService: FridgeService
  ) {
    this.newFridgeItem = new ShoppingItem();
  }

  /**
   * create array of items from constants, make last coreItem "otherGrey" active
   */
  public ngOnInit(): void {
    this.headerFridgeItems = Object
      .keys(CORE_ITEMS)
      .map(key => CORE_ITEMS[key]);
    if (this.itemInEdit) {
      this.newFridgeItem = this.itemInEdit;
      this.activeFridgeHeaderItem = this.itemInEdit;
    } else {
      this.newFridgeItem = new ShoppingItem();
      this.activeFridgeHeaderItem = this.headerFridgeItems[this.headerFridgeItems.length - 1];
    }
  }

  public addFridgeItem(): void {
    const localItem = this.newFridgeItem;

    if (localItem.title !== '') {
      this.fridgeService.addFridgeItem(localItem);
    }
    this.newFridgeItem = new ShoppingItem();
    this.newFridgeItem.color = this.activeFridgeHeaderItem.color;
    if (this.itemInEdit) {
      this.bottomSheetRef.dismiss();
    }
  }

  public onHeaderItemClicked(item: ShoppingItem): void {
    this.activeFridgeHeaderItem = item;
    this.newFridgeItem.color = item.color;
    this.newFridgeItem.order = item.order;
  }

  public onShelfItemClicked(item?: ShoppingItem): void {
    this.fridgeService.setShelfItem(item);
  }

  public deleteFridgeItemsBySelected(): void {
    this.fridgeService.deleteFridgeItemsBySelected();
  }

  public get isSelectedInList(): boolean {
    return this.fridgeService.isSelectedInList;
  }
}
