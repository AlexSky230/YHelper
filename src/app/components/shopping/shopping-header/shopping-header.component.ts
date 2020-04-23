import { Component, OnInit } from '@angular/core';
import {ShoppingItem} from '../../../helpers/classes/shopping-item';
import {ShoppingService} from '../../../helpers/shopping.service';
import {CategoriesColorsService} from '../../../helpers/categories-colors.service';
import {CategoriesColors} from '../../../helpers/classes/categories-colors';
import {buttonIcons} from '../../../constants/constants';

@Component({
  selector: 'app-shopping-header',
  templateUrl: './shopping-header.component.html',
  styleUrls: ['./shopping-header.component.scss']
})
export class ShoppingHeaderComponent implements OnInit {

  buttonIcons = buttonIcons;
  newShoppingItem = new ShoppingItem();

  constructor(
    private shoppingService: ShoppingService,
    private categoriesColorsService: CategoriesColorsService
  ) { }

  ngOnInit(): void {
  }

  public addShoppingItem(): void {
    this.shoppingService.addShoppingItem(this.newShoppingItem);
    this.newShoppingItem = new ShoppingItem();
  }

  /**
   * set selectedColor object in shopping service
   * reset .selected=false for all items except clicked item in categoriesColorsService
   * add new shoppingItem to reduce clicks for user
   */
  public onColorClicked(color: CategoriesColors): void {
    this.shoppingService.setColorOrder(color);
    this.categoriesColorsService.colorsToDefault();
    color.selected = true;
    this.addShoppingItem();
  }

  /**
   * button-click: move items from old Shopping list to fridge list component
   */
  public pushToFridge() {
    this.shoppingService.moveSelectedToFridge();
  }

  public get categoriesColors(): CategoriesColors[] {
    return this.categoriesColorsService.getAllCategories();
  }

  public get categoryColor(): CategoriesColors {
    return this.shoppingService.getCategoryColor();
  }

  public get oldShoppingItemsTicked(): ShoppingItem[] {
    return this.shoppingService.getOldShoppingItems()
      .filter((item) => item.ticked);
  }

}

