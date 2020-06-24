import {Component, OnInit} from '@angular/core';
import {FridgeService} from '../../helpers/fridge.service';
import {ButtonIcons, CORE_ITEMS} from '../../constants/constants';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ShoppingHeaderComponent} from '../shopping/shopping-header/shopping-header.component';
import {FridgeHeaderComponent} from './fridge-header/fridge-header.component';
import {ShoppingItem} from '../../helpers/classes/shopping-item';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent implements OnInit {

  public buttonIcons = ButtonIcons;
  public headerFridgeItems: ShoppingItem[];

  constructor(
    private bottomSheet: MatBottomSheet,
    private fridgeService: FridgeService
  ) {
  }

  ngOnInit(): void {
    this.fridgeService.getStoredItems('fridgeItems');
    this.fridgeService.getStoredShelfItem();
    this.fridgeService.setShelfItemList();
    this.headerFridgeItems = Object
      .keys(CORE_ITEMS)
      .map(key => CORE_ITEMS[key]);
  }

  public openMenu() {
    this.bottomSheet.open(FridgeHeaderComponent);
  }

  /**
   * button-click: move selected items from old Shopping list to fridge list component
   */
  public deleteSelected(): void {
    this.fridgeService.deleteFridgeItemsBySelected();
  }

  public onShelfItemClicked(item?: ShoppingItem): void {
    this.fridgeService.setShelfItem(item);
  }

  /**
   * return true if there are ticked items in the OldList Array
   */
  public get isSelected(): boolean {
    return this.fridgeService.isSelectedInList;
  }

  public get activeShelf(): ShoppingItem {
    return this.fridgeService.getActiveShelfItem();
  }

}
