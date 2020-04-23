import {Injectable} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {IdService} from './id.service';
import {FridgeService} from './fridge.service';
import {ShoppingItem} from './classes/shopping-item';
import {CoreItem} from './classes/core-item';
import {shoppingLabels, CORE_ITEMS} from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  public activeItem: CoreItem;
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
   * save to local storage
   */
  public addShoppingItem(item: ShoppingItem): void {
    if (item && item.title !== '') {
      item.id = this.getId();
      item.title = this.activeItem ? this.activeItem.title : CORE_ITEMS.default.title;
      item.color = this.activeItem ? this.activeItem.color : CORE_ITEMS.default.color;
      item.order = this.activeItem ? this.activeItem.order : CORE_ITEMS.default.order;
      item.selected = false;
      this.shoppingItems.unshift(item);
      this.saveToStorage(shoppingLabels.shoppingItems, this.shoppingItems);
    }
  }

  public toggleItemSelected(item: ShoppingItem): void {
    item.selected = !item.selected;
    this.saveToStorage(shoppingLabels.shoppingItemsOld, this.shoppingItemsOld);
  }

  /**
   * push array of item with .ticked=true to fridgeItems[] in Fridge Component using Service
   */
  public moveSelectedToFridge(): void {
    const selected: ShoppingItem[] = this.shoppingItemsOld
      .filter(it => it.selected);
    selected.forEach(it => it.selected = false);
    this.fridgeService.addFromShoppingList(selected);
    this.saveToStorage(shoppingLabels.shoppingItemsOld, this.shoppingItemsOld);
  }

  /**
   * move elements from NewList to OldList using .id
   */
  public moveToOld(item: ShoppingItem): void {
    this.shoppingItems = this.shoppingItems.filter(it => it.id !== item.id);
    this.shoppingItemsOld.unshift(item);
    this.saveToStorage(shoppingLabels.shoppingItems, this.shoppingItems);
    this.saveToStorage(shoppingLabels.shoppingItemsOld, this.shoppingItemsOld);
  }

  /**
   * move elements from OldList to NewList using .id and reset .bought=false
   */
  public moveToNew(item: ShoppingItem): void {
    this.shoppingItemsOld = this.shoppingItemsOld
      .filter(el => el.id !== item.id);
    item.bought = false;
    this.shoppingItems.unshift(item);
    this.saveToStorage(shoppingLabels.shoppingItems, this.shoppingItems);
    this.saveToStorage(shoppingLabels.shoppingItemsOld, this.shoppingItemsOld);
  }

  public deleteOldShoppingItem(item: ShoppingItem): void {
    this.shoppingItemsOld = this.shoppingItemsOld
      .filter(it => it.id !== item.id);
    this.saveToStorage(shoppingLabels.shoppingItemsOld, this.shoppingItemsOld);
  }

  /**
   * get shopping Items from Local Storage and build shoppingItems[]
   */
  public getStoredItems(key: string): void {
    this.localStorage
      .getDataFromStorageById(key)
      .subscribe((data) => {
        if (data === undefined) {
          data = [];
        }
        this.buildShoppingList(data, key);
      });
  }

  public getNewShoppingItems(): ShoppingItem[] {
    return this.shoppingItems;
  }

  public getCategoryColor(): CoreItem {
    return this.activeItem;
  }

  public getOldShoppingItems(): ShoppingItem[] {
    return this.shoppingItemsOld;
  }

  public setColorOrder(item: CoreItem) {
    this.activeItem = item;
  }

  /**
   * toggle .bought and move item to shoppingItemsOld[]
   */
  public toggleShoppingItemBought(item: ShoppingItem): void {
    item.bought = !item.bought;
    this.moveToOld(item);
  }

  /**
   * create shoppingItem array depending on data received from Local Storage
   */
  private buildShoppingList(items: ShoppingItem[], key: string): void {
    if (key === shoppingLabels.shoppingItems) {
      this.shoppingItems = items;
    } else if (key === shoppingLabels.shoppingItemsOld) {
      this.shoppingItemsOld = items;
    }
  }

  private getId(): number {
    return this.idService.getId();
  }

  private saveToStorage(key: string, array: ShoppingItem[]): void {
    this.localStorage.addDataToStorage(key, array);
  }
}
