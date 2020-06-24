import {Injectable} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {IdService} from './id.service';

import {ShoppingItem} from './classes/shopping-item';
import {CoreLabels} from '../constants/constants';
import {ColorItem} from './classes/color-item';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {

  public isSelectedInList: boolean;
  public activeShelfItem: ShoppingItem;
  public fridgeItems: ShoppingItem[] = [];
  public fridgeShelfItems: ShoppingItem[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private idService: IdService,
  ) {
    this.activeShelfItem = new ShoppingItem();
    this.activeShelfItem.title = 'All';
    this.activeShelfItem.key = 'all';
  }

  /**
   * add item to fridgeItems[], set .id .quantity .category .color .order
   * save to local storage
   */
  public addFridgeItem(item: ShoppingItem): void {
    if (item) {
      if (this.fridgeItems.indexOf(item) === -1) {
        item.id = this.getId();
        item.selected = false;
        item.quantity = 1;
        this.fridgeItems.unshift(item);
      }
      this.sortItems();
      this.saveToStorage(CoreLabels.fridgeItems, this.fridgeItems);
    }
  }

  /**
   * add items pushed from shopping list component
   */
  public addFromShoppingList(shoppingItems: ShoppingItem[]) {
    for (const item of shoppingItems) {
      item.selected = false;
      item.quantity = 1;
      this.fridgeItems.unshift(item);
      this.sortItems();
    }
    this.saveToStorage(CoreLabels.fridgeItems, this.fridgeItems);
    this.setShelfItemList();
  }

  public deleteFridgeItemsBySelected(): void {
    this.fridgeItems = this.fridgeItems
      .filter(fridgeItem => fridgeItem.selected !== true);
    this.saveToStorage(CoreLabels.fridgeItems, this.fridgeItems);
    this.setShelfItemList();
    this.setIsItemSelectedStatus();
  }

  public deleteFridgeItem(item: ShoppingItem): void {
    this.fridgeItems = this.fridgeItems
      .filter(fridgeItem => fridgeItem !== item);
    this.saveToStorage(CoreLabels.fridgeItems, this.fridgeItems);
    this.setShelfItemList();
    this.setIsItemSelectedStatus();
  }

  /**
   * get fridgeItems from Local Storage and build fridgeItems[]
   */
  public getStoredItems(key: string): void {
    this.localStorage
      .getDataFromStorageById(key)
      .subscribe((data: ShoppingItem[]) => {
        if (data === undefined) {
          data = [];
        }
        this.buildFridgeItemsList(data);
        this.sortItems();
      });
  }

  public getStoredShelfItem(): void {
    this.localStorage
      .getDataFromStorageById(CoreLabels.activeShelfItem)
      .subscribe((si: ShoppingItem) => {
        this.setShelfItem(si);
      });
  }

  private buildFridgeItemsList(items: ShoppingItem[]): void {
    this.fridgeItems = items;
  }

  public getFridgeShelfItems(): ShoppingItem[] {
    return this.fridgeShelfItems;
  }

  public getActiveShelfItem(): ShoppingItem {
    return this.activeShelfItem;
  }

  /**
   * sets isSelectedInList to true if there are ticked items in the OldList Array
   */
  public setIsItemSelectedStatus(): void {
    this.isSelectedInList = this.fridgeItems
      .filter((item) => item.selected)
      .length > 0;
  }

  /**
   * get unique ID/timestamp: current time in milliseconds since 1970
   */
  private getId(): number {
    return this.idService.getId();
  }

  private saveToStorage(key: string, value: any): void {
    this.localStorage.addDataToStorage(key, value);
  }

  public toggleFridgeItemTicked(item: ShoppingItem): void {
    item.selected = !item.selected;
    this.setIsItemSelectedStatus();
    this.saveToStorage(CoreLabels.fridgeItems, this.fridgeItems);
    this.setShelfItemList();
  }

  public quantityPlus(fridgeItem: ShoppingItem): void {
    fridgeItem.quantity += 1;
    this.saveToStorage(CoreLabels.fridgeItems, this.fridgeItems);
    this.setShelfItemList();
  }

  public setShelfItem(item?: ShoppingItem): void {
    if (item && item.key && item.title) {
      this.activeShelfItem = item;
    } else {
      this.activeShelfItem = new ShoppingItem();
      this.activeShelfItem.key = CoreLabels.all;
      this.activeShelfItem.title = 'All';
    }
    this.saveToStorage(CoreLabels.activeShelfItem, item);
    this.setShelfItemList();
  }

  public quantityMinus(item: ShoppingItem): void {
    item.quantity--;
    if (item.quantity < 1) {
      this.fridgeItems = this.fridgeItems.filter(it => it.quantity > 0);
    }
    this.saveToStorage(CoreLabels.fridgeItems, this.fridgeItems);
    this.setShelfItemList();
  }

  public setShelfItemList(): void {
    this.fridgeShelfItems = (this.activeShelfItem.key === CoreLabels.all) ?
      this.fridgeItems : this.fridgeItems.filter(fi => fi.order === this.activeShelfItem.order);
  }

  private sortItems(): void {
    this.fridgeItems.sort((a, b) => a.order - b.order);
    this.setShelfItemList();
  }
}
