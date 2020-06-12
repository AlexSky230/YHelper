import {Component, Inject, OnInit} from '@angular/core';

import {ShoppingItem} from '../../../helpers/classes/shopping-item';
import {ShoppingService} from '../../../helpers/shopping.service';

import {ButtonIcons, CORE_ITEMS} from '../../../constants/constants';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-shopping-header',
  templateUrl: './shopping-header.component.html',
  styleUrls: ['./shopping-header.component.scss']
})
export class ShoppingHeaderComponent implements OnInit {

  public newShoppingItem: ShoppingItem;
  public buttonIcons = ButtonIcons;

  public activeShoppingHeaderItem: ShoppingItem;
  public headerShoppingItems: ShoppingItem[];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public itemInEdit: ShoppingItem,
    private bottomSheetRef: MatBottomSheetRef<ShoppingHeaderComponent>,
    private shoppingService: ShoppingService,
  ) {
    this.newShoppingItem = new ShoppingItem();
  }

  /**
   * create array of items from constants, make last coreItem "otherGrey" active
   * if Item comes from list-Edit make it newShoppingItem
   */
  ngOnInit(): void {
    this.headerShoppingItems = Object
      .keys(CORE_ITEMS)
      .map(key => CORE_ITEMS[key]);
    if (this.itemInEdit) {
      this.newShoppingItem = this.itemInEdit;
      this.activeShoppingHeaderItem = this.itemInEdit;
    } else {
      this.newShoppingItem = new ShoppingItem();
      this.activeShoppingHeaderItem = this.headerShoppingItems[this.headerShoppingItems.length - 1];
    }
  }

  public addShoppingItem(): void {
    const localItem = this.newShoppingItem;

    if (localItem.title !== '') {
      this.shoppingService.addShoppingItem(localItem);
    }
    this.newShoppingItem = new ShoppingItem();
    this.newShoppingItem.color = this.activeShoppingHeaderItem.color;
    this.newShoppingItem.order = this.activeShoppingHeaderItem.order;
    if (this.itemInEdit) {
      this.bottomSheetRef.dismiss();
    }
  }

  public onHeaderItemClicked(color: ShoppingItem): void {
    this.activeShoppingHeaderItem = color;
    this.newShoppingItem.color = color.color;
    this.newShoppingItem.order = color.order;

  }

}

