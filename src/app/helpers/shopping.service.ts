import {Injectable} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {IdService} from './id.service';
import {FridgeService} from './fridge.service';
import {ShoppingItem} from './classes/shopping-item';
import {CategoriesColors} from './classes/categories-colors';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  public categoryColor: CategoriesColors;
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
    if (item.title !== '') {
      item.id = this.getId();
      item.category = this.categoryColor !== undefined ? this.categoryColor.type : 'other';
      item.color = this.categoryColor !== undefined ? this.categoryColor.color : 'grey';
      item.order = this.categoryColor !== undefined ? this.categoryColor.order : 9;
      item.ticked = false;
      this.shoppingItems.unshift(item);
      this.saveToStorage('shoppingItems', this.shoppingItems);
    }
  }

  public toggleItemSelected(item: ShoppingItem): void {
    item.ticked = !item.ticked;
    this.saveToStorage('shoppingItemsOld', this.shoppingItemsOld);
  }

  /**
   * push array of item with .ticked=true to fridgeItems[] in Fridge Component using Service
   */
  public moveSelectedToFridge(): void {
    const selected: ShoppingItem[] = this.shoppingItemsOld
      .filter(it => it.ticked);
    selected.forEach(it => it.ticked = false);
    this.fridgeService.addFromShoppingList(selected);
    this.saveToStorage('shoppingItemsOld', this.shoppingItemsOld);
  }

  /**
   * move elements from NewList to OldList using .id
   */
  public moveToOld(item: ShoppingItem): void {
    this.shoppingItems = this.shoppingItems.filter(it => it.id !== item.id);
    this.shoppingItemsOld.unshift(item);
    this.saveToStorage('shoppingItems', this.shoppingItems);
    this.saveToStorage('shoppingItemsOld', this.shoppingItemsOld);
  }

  /**
   * move elements from OldList to NewList using .id and reset .bought=false
   */
  public moveToNew(item: ShoppingItem): void {
    this.shoppingItemsOld = this.shoppingItemsOld
      .filter(el => el.id !== item.id);
    item.bought = false;
    this.shoppingItems.unshift(item);
    this.saveToStorage('shoppingItems', this.shoppingItems);
    this.saveToStorage('shoppingItemsOld', this.shoppingItemsOld);
  }

  public deleteOldShoppingItem(item: ShoppingItem): void {
    this.shoppingItemsOld = this.shoppingItemsOld
      .filter(it => it.id !== item.id);
    this.saveToStorage('shoppingItemsOld', this.shoppingItemsOld);
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

  public getCategoryColor(): CategoriesColors {
    return this.categoryColor;
  }

  public getOldShoppingItems(): ShoppingItem[] {
    return this.shoppingItemsOld;
  }

  public setColorOrder(item: CategoriesColors) {
    this.categoryColor = item;
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
    if (key === 'shoppingItems') {
      this.shoppingItems = items;
    } else if (key === 'shoppingItemsOld') {
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
