import {Component, Inject, OnInit} from '@angular/core';

import {ShoppingItem} from '../../../helpers/classes/shopping-item';
import {ShoppingService} from '../../../helpers/shopping.service';

import {ButtonIcons, CORE_ITEMS, CoreLabels} from '../../../constants/constants';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-shopping-header',
  templateUrl: './shopping-header.component.html',
  styleUrls: ['./shopping-header.component.scss']
})
export class ShoppingHeaderComponent implements OnInit {

  public newShoppingItem: ShoppingItem;
  public buttonIcons = ButtonIcons;

  public coreLabels = CoreLabels;
  public activeColor: ShoppingItem;
  public headerColors: ShoppingItem[];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public item: ShoppingItem,
    private bottomSheetRef: MatBottomSheetRef<ShoppingHeaderComponent>,
    private shoppingService: ShoppingService,
    ) {}

  /**
   * create array of items from constants, make last coreItem "otherGrey" active
   * if Item comes from list-Edit make it newShoppingItem
   */
  ngOnInit(): void {
    this.headerColors = Object
      .keys(CORE_ITEMS)
      .map(key => CORE_ITEMS[key]);
    if (this.item) {
      this.newShoppingItem = this.item;
      this.activeColor = this.item;
  } else {
      this.newShoppingItem = new ShoppingItem();
      this.activeColor = this.headerColors[this.headerColors.length - 1];
    }
  }

  public addShoppingItem(): void {
    const localItem = this.newShoppingItem;

    if (localItem.title !== '') {
      this.shoppingService.addShoppingItem(localItem);
    }
    this.newShoppingItem = new ShoppingItem();
    if (this.item) {
      this.bottomSheetRef.dismiss();
    }
  }

  public onHeaderItemClicked(color: ShoppingItem): void {
    this.activeColor = color;
    this.newShoppingItem.color = color.color;
    this.newShoppingItem.order = color.order;

  }

}

