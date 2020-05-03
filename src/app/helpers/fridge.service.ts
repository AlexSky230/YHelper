import {Injectable} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {IdService} from './id.service';

import {ShoppingItem} from './classes/shopping-item';
import {coreLabels} from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {

  public isSelectedInList: boolean;
  public fridgeItems: ShoppingItem[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private idService: IdService,
  ) {
  }

  /**
   * add item to fridgeItems[], set .id .quantity .category .color .order
   * save to local storage
   */
  public addFridgeItem(item: ShoppingItem): void {
    if (item && item.title && item.color && item.order && item.key) {
      item.id = this.getId();
      item.selected = false;
      item.quantity = 1;
      this.fridgeItems.unshift(item);
      this.sortItems();
      this.saveToStorage(coreLabels.fridgeItems, this.fridgeItems);
    }
  }

  /**
   * add items pushed from shopping list component
   */
  public addFromShoppingList(shoppingItems: ShoppingItem[]) {
    for (const item of shoppingItems) {
      item.quantity = 1;
      this.fridgeItems.unshift(item);
    }
    this.saveToStorage(coreLabels.fridgeItems, this.fridgeItems);
  }

  public deleteFridgeItemsBySelected(): void {
    this.fridgeItems = this.fridgeItems
      .filter(fridgeItem => fridgeItem.selected !== true);
    this.saveToStorage(coreLabels.fridgeItems, this.fridgeItems);
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
      });
  }

  private buildFridgeItemsList(items: ShoppingItem[]): void {
    this.fridgeItems = items;
  }

  public getAllFridgeItems(): ShoppingItem[] {
    return this.fridgeItems;
  }

  /**
   * sets isSelectedInList to true if there are ticked items in the OldList Array
   */
  public isItemSelected(): void {
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

  private saveToStorage(key: string, value: ShoppingItem[]): void {
    this.localStorage.addDataToStorage(key, value);
  }

  public getFridgeItemsByCategory(category: string): ShoppingItem[] {
    return this.fridgeItems
      .filter(fridgeItem => fridgeItem.title === category);
  }

  public toggleFridgeItemTicked(item: ShoppingItem): void {
    item.selected = !item.selected;
    this.isItemSelected();
    this.saveToStorage(coreLabels.fridgeItems, this.fridgeItems);
  }

  public quantityPlus(fridgeItem: ShoppingItem): void {
    fridgeItem.quantity += 1;
    this.saveToStorage(coreLabels.fridgeItems, this.fridgeItems);
  }

  public quantityMinus(item: ShoppingItem): void {
    item.quantity--;
    if (item.quantity < 1) {
      this.fridgeItems = this.fridgeItems.filter(it => it.quantity > 0);
    }
    this.saveToStorage(coreLabels.fridgeItems, this.fridgeItems);
  }

  private sortItems(): void {
    this.fridgeItems.sort((a, b) => a.order - b.order);
  }
}
