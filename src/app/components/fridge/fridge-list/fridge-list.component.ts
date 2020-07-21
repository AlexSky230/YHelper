import {Component, ViewChild} from '@angular/core';
import {FridgeService} from 'helpers/fridge.service';
import {ShoppingItem} from 'shared/classes/shopping-item';
import {ColorItem} from 'shared/classes/color-item';
import {ButtonIcons} from 'shared/constants/constants';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {FridgeHeaderComponent} from '../fridge-header/fridge-header.component';

@Component({
  selector: 'app-fridge-list',
  templateUrl: './fridge-list.component.html',
  styleUrls: ['./fridge-list.component.scss']
})
export class FridgeListComponent {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public buttonIcons = ButtonIcons;
  public menuData: ShoppingItem;

  constructor(
    public bottomSheet: MatBottomSheet,
    private fridgeService: FridgeService) {
  }

  public get fridgeListItems(): ShoppingItem[] {
    return this.fridgeService.getFridgeShelfItems();
  }

  public get activeShelf(): ColorItem {
    return this.fridgeService.getActiveShelfItem();
  }

  public editItem(item: ShoppingItem) {
    this.bottomSheet.open(FridgeHeaderComponent, {data: item});
  }

  public removeItem(item: ShoppingItem): void {
    this.fridgeService.deleteFridgeItem(item);
  }

  public setMenuData(item: ShoppingItem): void {
    event.stopPropagation();
    this.menuData = item;
  }

  public toggleFridgeItemTicked(item: ShoppingItem) {
    this.fridgeService.toggleFridgeItemTicked(item);
  }

  public quantityPlus(item: ShoppingItem, $event) {
    this.fridgeService.quantityPlus(item);
    $event.stopPropagation();
  }

  public quantityMinus(item: ShoppingItem, $event) {
    this.fridgeService.quantityMinus(item);
    $event.stopPropagation();
  }
}
