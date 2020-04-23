import {Injectable} from '@angular/core';
import {CoreItem} from './classes/core-item';
import {ShoppingItem} from './classes/shopping-item';
import {LocalStorageService} from '../services/local-storage.service';
import {IdService} from './id.service';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {

  public categoryColor: CoreItem;
  public fridgeItems: ShoppingItem[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private idService: IdService,
  ) {
    this.getStoredItems('fridgeItems');
  }

  /**
   * add items pushed from shopping list component
   */
  public addFromShoppingList(shoppingItems: ShoppingItem[]) {
    for (const item of shoppingItems) {
      item.quantity = 1;
      this.fridgeItems.unshift(item);
    }
    this.saveToStorage('fridgeItems');
  }

  /**
   * add item to fridgeItems[], set .id .quantity .category .color .order
   * save to local storage
   */
  public addFridgeItem(item: ShoppingItem): void {
    if (item.title !== '') {
      item.id = this.getId();
      item.quantity = 1;
      item.title = this.categoryColor ? this.categoryColor.title : 'other';
      item.color = this.categoryColor ? this.categoryColor.color : 'grey';
      item.order = this.categoryColor ? this.categoryColor.order : 9;
      this.fridgeItems.unshift(item);
      this.saveToStorage('fridgeItems');
    }
  }

  public deleteFridgeItemBySelected(): void {
    this.fridgeItems = this.fridgeItems
      .filter(fridgeItem => fridgeItem.selected !== true);
    this.saveToStorage('fridgeItems');
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

  private saveToStorage(key: string): void {
    this.localStorage.addDataToStorage(key, this.fridgeItems);
  }

  public getAllFridgeItems(): ShoppingItem[] {
    return this.fridgeItems;
  }

  /**
   * get unique ID/timestamp: current time in milliseconds since 1970
   */
  private getId(): number {
    return this.idService.getId();
  }

  public getFridgeItemsByCategory(category: string): ShoppingItem[] {
    return this.fridgeItems
      .filter(fridgeItem => fridgeItem.title === category);
  }

  public setCategoryColor(color: CoreItem) {
    this.categoryColor = color;
  }

  public toggleFridgeItemTicked(item: ShoppingItem): void {
    item.selected = !item.selected;
  }

  public quantityPlus(fridgeItem: ShoppingItem): void {
    fridgeItem.quantity += 1;
    this.saveToStorage('fridgeItems');
  }

  public quantityMinus(item: ShoppingItem): void {
    item.quantity--;
    if (item.quantity < 1) {
      this.fridgeItems = this.fridgeItems.filter(it => it.quantity > 0);
    }
    this.saveToStorage('fridgeItems');
  }
}
