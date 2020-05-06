import {Component} from '@angular/core';
import {FridgeService} from '../../../helpers/fridge.service';
import {ShoppingItem} from '../../../helpers/classes/shopping-item';
import {ColorItem} from '../../../helpers/classes/color-item';
import {buttonIcons} from '../../../constants/constants';

@Component({
  selector: 'app-fridge-list',
  templateUrl: './fridge-list.component.html',
  styleUrls: ['./fridge-list.component.scss']
})
export class FridgeListComponent {

  buttonIcons = buttonIcons;

  constructor(private fridgeService: FridgeService) {
  }

  public get fridgeListItems(): ShoppingItem[] {
    return this.fridgeService.getFridgeShelfItems();
  }

  public get activeShelf(): ColorItem {
    return this.fridgeService.getActiveShelfItem();
  }

  public toggleFridgeItemTicked(item: ShoppingItem) {
    this.fridgeService.toggleFridgeItemTicked(item);
  }

  public quantityPlus(item: ShoppingItem) {
    this.fridgeService.quantityPlus(item);
  }

  public quantityMinus(item: ShoppingItem) {
    this.fridgeService.quantityMinus(item);
  }
}
