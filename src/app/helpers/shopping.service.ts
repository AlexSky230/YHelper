import {Injectable} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {IdService} from './id.service';
import {FridgeService} from './fridge.service';

import {ShoppingItem} from './classes/shopping-item';
import {CoreLabels} from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  public isSelectedInOld: boolean;
  public shoppingItems: ShoppingItem[] = [];
  public shoppingItemsOld: ShoppingItem[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private idService: IdService,
    private fridgeService: FridgeService,
  ) {
  }

  /**
   * set .id .category .color .order .ticked, add item to ShoppingItem[]
   * sort Shoppingitems[] by order
   * save to local storage
   */
  public addShoppingItem(item: ShoppingItem): void {
    if (item) {
      if (this.shoppingItems.indexOf(item) === -1) {
        item.id = this.getId();
        item.selected = false;
        item.isBought = false;
        this.shoppingItems.unshift(item);
      }
      this.sortAndSave(item);
    }
  }

  public deleteShoppingItem(item: ShoppingItem): void {
    this.shoppingItems = this.shoppingItems
      .filter(it => it !== item);
    this.saveToStorage(CoreLabels.shoppingItems, this.shoppingItems);
  }

  public deleteOldShoppingItem(item: ShoppingItem): void {
    this.shoppingItemsOld = this.shoppingItemsOld
      .filter(it => it !== item);
    this.saveToStorage(CoreLabels.shoppingItemsOld, this.shoppingItemsOld);
  }

  public getNewShoppingItems(): ShoppingItem[] {
    return this.shoppingItems;
  }

  public getOldShoppingItems(): ShoppingItem[] {
    return this.shoppingItemsOld;
  }

  /**
   * get shopping Items from Local Storage and build shoppingItems[]
   */
  public getStoredItems(key: string): void {
    this.localStorage
      .getDataFromStorageById(key)
      .subscribe((data: ShoppingItem[]) => {
        if (data === undefined) {
          data = [];
        }
        this.buildShoppingList(data, key);
      });
  }

  /**
   * sets isSelectedInOld to true if there are ticked items in the OldList Array
   */
  public isOldItemSelected(): void {
    this.isSelectedInOld = this.shoppingItemsOld
      .filter((item) => item.selected)
      .length > 0;
  }

  /**
   * push array of Old items with .ticked=true to fridgeItems[] in Fridge Component using Service, set selected to false
   */
  public moveSelectedToFridge(): void {
    const selectedOldItems: ShoppingItem[] = this.shoppingItemsOld.filter(it => it.selected);
    this.fridgeService.addFromShoppingList(selectedOldItems);
    this.shoppingItemsOld.forEach(it => it.selected = false);
    this.isSelectedInOld = false;
    this.saveToStorage(CoreLabels.shoppingItemsOld, this.shoppingItemsOld);
  }

  /**
   * move elements from NewList to OldList using .id, sort lists and save
   */
  public moveToOld(item: ShoppingItem): void {
    item.isBought = true;
    item.selected = false;
    this.shoppingItems = this.shoppingItems.filter(it => it.id !== item.id);
    this.shoppingItemsOld.unshift(item);
    this.sortAndSave(item);
  }

  /**
   * move elements from OldList to NewList using .id and reset .bought=false, sort lists and save
   */
  public moveToNew(item: ShoppingItem): void {
    item.isBought = false;
    this.shoppingItemsOld = this.shoppingItemsOld.filter(it => it.id !== item.id);
    this.shoppingItems.unshift(item);
    this.sortAndSave(item);
  }

  /**
   * toggle .bought and move item to shoppingItemsOld[]
   */
  public toggleShoppingItemBought(item: ShoppingItem): void {
    item.isBought = !item.isBought;
    this.moveToOld(item);
    this.sortItems(item);
  }

  public toggleItemSelected(item: ShoppingItem): void {
    item.selected = !item.selected;
    this.isOldItemSelected();
    this.saveToStorage(CoreLabels.shoppingItemsOld, this.shoppingItemsOld);
  }

  /**
   * create shoppingItem array depending on data received from Local Storage
   */
  private buildShoppingList(items: ShoppingItem[], key: string): void {
    if (key === CoreLabels.shoppingItems) {
      this.shoppingItems = items;
    } else if (key === CoreLabels.shoppingItemsOld) {
      this.shoppingItemsOld = items;
    }
  }

  private getId(): number {
    return this.idService.getId();
  }

  private saveToStorage(key: string, value: ShoppingItem[]): void {
    this.localStorage.addDataToStorage(key, value);
  }

  /**
   * if item.bought sort old list, else sort active list
   */
  private sortItems(item: ShoppingItem): void {
    if (!item.isBought) {
      this.shoppingItems.sort((a, b) => a.order - b.order);
    } else if (item.isBought) {
      this.shoppingItemsOld.sort((a, b) => a.order - b.order);
    }
  }

  private sortAndSave(item: ShoppingItem): void {
    this.sortItems(item);
    this.saveToStorage(CoreLabels.shoppingItems, this.shoppingItems);
    this.saveToStorage(CoreLabels.shoppingItemsOld, this.shoppingItemsOld);
  }
}
